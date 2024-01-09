const axios = require('axios');
require('dotenv').config();

async function interpretQuery(query) {
  const openAiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Given a user query about the Cardano blockchain, determine the appropriate Go Maestro API endpoint. Go Maestro provides a set of API endpoints specifically designed to interact with the Cardano blockchain. The possible endpoints are "blockInfoByHeight", "blockInfoByHash", "latestBlock", "txCountByAddress", "txsByAddress", and "utxosByAddress". Each of these endpoints corresponds to a specific type of query about the Cardano blockchain. If unable to determine the appropriate endpoint for a given query, please say, "Unsupported query type: [query]".\n' +
          '\n' +
          'Here are some examples of how queries map to endpoints:\n' +
          '"What is the latest block?" -> "latestBlock"\n' +
          '"What is the current block?" -> "latestBlock"\n' +
          '"Number of transactions in current block?" -> "latestBlock"\n' +
          '"Get block info for height 12345" -> "blockInfoByHeight"\n' +
          '"Get block info for hash [64-character hash]" -> "blockInfoByHash"\n' +
          '"Get block info for hash [NOT 64-character hash]" -> "Incorrect hash length: [length of the hash]. Expected 64 characters."\n' +
          '"How many transactions for address addr1xyz?" -> "txCountByAddress"\n' +
          '"List transactions for address addr1xyz" -> "txsByAddress"\n' +
          '"Show UTXOs for address addr1xyz" -> "utxosByAddress"\n' +
          '\n' +
          `For a given query "${query}", the endpoint would be ???`
      },
      { role: 'user', content: query }
    ]
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  // Extract the text response from the OpenAI response
  const openAiTextResponse = openAiResponse.data.choices[0].message.content.replace(/"/g, '').trim();
  console.log('OpenAI Response:', JSON.stringify(openAiResponse.data, null, 2));
  console.log('OpenAI Text Response:', openAiTextResponse);


  // Map the OpenAI response to Go Maestro API call types
  try {
    switch (openAiTextResponse) {
      case 'latestBlock':
        return { type: 'latestBlock' };
      case 'blockInfoByHeight':
        const height = extractBlockHeight(query); // Implement this function
        return { type: 'blockInfoByHeight', height };
      case 'blockInfoByHash':
        const hash = extractBlockHash(query); // Implement this function
        return { type: 'blockInfoByHash', hash };
      case 'txCountByAddress':
        const addressForTxCount = extractAddress(query); // Implement this function
        return { type: 'txCountByAddress', address: addressForTxCount };
      case 'txsByAddress':
        const addressForTxs = extractAddress(query);
        return { type: 'txsByAddress', address: addressForTxs };
      case 'utxosByAddress':
        const addressForUtxos = extractAddress(query);
        return { type: 'utxosByAddress', address: addressForUtxos };
      default:
        return { type: 'unknown' };
    }
  } catch (error) {
    console.error('Error interpreting query with OpenAI:', error);
    console.error('OpenAI Response:', error.response ? error.response.data : 'No response data');
    console.error('Full error object:', error);
    throw error; // Or handle the error as needed
  }
}

function extractBlockHeight(query) {
  const heightPattern = /(?:block\s*\D*)?(\d+)/i;
  const match = query.match(heightPattern);
  return match ? match[1].trim() : null; // Trimming any whitespace around the digits
}

function extractBlockHash(query) {
  const hashPattern = /hash\s*([a-f0-9]{64})\b/i; // Ensures exactly 64 hex characters are captured
  const match = query.match(hashPattern);

  if (match) {
    const hash = match[1].trim(); // Trimming any whitespace
    return (hash.length === 64) ? hash : `Incorrect hash length: ${hash.length}. Expected 64 characters.`;
  }
  return null;
}

function extractAddress(query) {
  const match = query.match(/(addr(1|_test1)[^?\s]+)/i);
  if (match) {
    // Trim any leading/trailing whitespace and remove a trailing period if present
    return match[1].trim().replace(/\.$/, '');
  }
  return null;
}

module.exports = {
  interpretQuery,
  extractBlockHeight,
  extractBlockHash,
  extractAddress,
};






  
