const axios = require('axios');
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function interpretQuery(query, OPENAI_API_KEY) {
  const openAiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Given a user query about blockchain, determine the appropriate Go Maestro API endpoint:\n' +
          '\n' +
          '"What is the latest block?" -> "latestBlock"\n' +
          '"What is the current block?" -> "latestBlock"\n' +
          '"Get block info for height 12345" -> "blockInfoByHeight"\n' +
          '"Get block info for hash [64-character hash]" -> "blockInfoByHash"\n' +
          '"Get block info for hash [NOT 64-character hash]" -> "Incorrect hash length: [length of the hash]. Expected 64 characters."\n' +
          '"How many transactions for address addr1xyz?" -> "txCountByAddress"\n' +
          '"List transactions for address addr1xyz" -> "txsByAddress"\n' +
          '"Show UTXOs for address addr1xyz" -> "utxosByAddress"\n' +
          '\n' +
          `"${query}" -> ???`
      },
      { role: 'user', content: query }
    ]
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  console.log('OpenAI Response:', openAiResponse.data);
  console.log('OpenAI Response:', openAiResponse.data.choices[0].message.content);
}

interpretQuery("What is the transaction fee for txid abcdef1234567890", OPENAI_API_KEY)
  .then(() => console.log('Query interpretation completed.'))
  .catch(error => console.error('Error in interpretQuery:', error));

