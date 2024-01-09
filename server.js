const express = require('express');
const path = require('path');
const axios = require('axios');
const { interpretQuery } = require('./queryInterpreter');
require('dotenv').config();

const GOMAESTRO_API_BASE_URL = 'https://preprod.gomaestro-api.org/v1';
const app = express();
const port = 3000;

app.use(express.static('Public')); // serves files in the current directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function fetchBlockDataFromGoMaestro(queryResult) {
    console.log('queryResult:', queryResult);
    console.log('GOMAESTRO_API_BASE_URL:', GOMAESTRO_API_BASE_URL);
    console.log('GOMAESTRO_API_KEY:', process.env.GOMAESTRO_API_KEY);
    let url;

    switch (queryResult.type) {
        case 'blockInfoByHeight':
            url = `${GOMAESTRO_API_BASE_URL}/blocks/${queryResult.height}`;
            break;
        case 'blockInfoByHash':
            url = `${GOMAESTRO_API_BASE_URL}/blocks/${queryResult.hash}`;
            break;
        case 'latestBlock':
            url = `${GOMAESTRO_API_BASE_URL}/blocks/latest`;
            break;
        case 'txCountByAddress':
            url = `${GOMAESTRO_API_BASE_URL}/addresses/${queryResult.address}/transactions/count`;
            break;
        case 'txsByAddress':
            url = `${GOMAESTRO_API_BASE_URL}/addresses/${queryResult.address}/transactions`;
            break;
        case 'utxosByAddress':
            url = `${GOMAESTRO_API_BASE_URL}/addresses/${queryResult.address}/utxos`;
            break;
        default:
            throw new Error(`Unsupported query type: ${queryResult.type}`);
    }
    console.log('Case:', queryResult.type, 'URL:', url);

    try {
        var config = {
            method: 'get',
            url: url,
            headers: { 
                'Accept': 'application/json', 
                'api-key': process.env.GOMAESTRO_API_KEY
            },
            maxBodyLength: Infinity
        };
    
        const response = await axios(config);
        console.log('Response from Go Maestro API:', response.data); // Add this line
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from Go Maestro API: ${error}`);
        throw error;
    }
}

async function processNaturalLanguageQuery(blockchainData, userQuery) {
    console.log('processNaturalLanguageQuery called');
    console.log('blockchainData:', blockchainData, 'userQuery:', userQuery);
    const data = {
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: 'Given the user query and the data from the Go Maestro API, generate a natural language response that accurately answers the user\'s query.'
            },
            {
                role: 'system',
                content: `The data from the Go Maestro API is: ${JSON.stringify(blockchainData)}`
            },
            { role: 'user', content: userQuery }
        ]
    };

    console.log('Data sent to OpenAI API:', data);

    const openAiResponse = await axios.post('https://api.openai.com/v1/chat/completions', data, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    // Extract the text response from the OpenAI response
    const responseText = openAiResponse.data.choices[0].message.content;

    return responseText; // Return the response text
}

app.post('/processQuery', async (req, res) => {
    console.log('Received request body:', req.body);
    const userQuery = req.body.query;
    console.log('Received user query:', userQuery);

    if (!userQuery) {
        return res.status(400).json({
            error: 'No query provided. Please submit a query related to: latest block information, block information by height, block information by hash, transaction count by address, transactions by address, or UTXOs by address.'
        });
    }
    
    try {
        const interpretedResult = await interpretQuery(userQuery);
        console.log('interpretedResult:', interpretedResult);

        if (!interpretedResult || typeof interpretedResult !== 'object' || !interpretedResult.type) {
            return res.status(400).json({ error: 'Invalid interpreted result' });
        }

        if (interpretedResult.type === 'unknown') {
            return res.status(400).json({
                error: 'Query could not be interpreted. Currently supported queries include: latest block information, block information by height, block information by hash, transaction count by address, transactions by address, and UTXOs by address.'
            });
        }

        console.log('Before fetchBlockDataFromGoMaestro');
        const blockchainData = await fetchBlockDataFromGoMaestro(interpretedResult);
        console.log('After fetchBlockDataFromGoMaestro:', blockchainData);

        const processedResponse = await processNaturalLanguageQuery(blockchainData, userQuery);
        res.json({ response: processedResponse });
    } catch (error) {
        console.error('Error in processing query:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { fetchBlockDataFromGoMaestro, processNaturalLanguageQuery };


