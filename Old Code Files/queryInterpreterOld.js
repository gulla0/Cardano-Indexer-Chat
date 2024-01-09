function interpretQuery(query) {
    // Convert the query to lowercase to ensure consistent matching
    query = query.toLowerCase();
  
    // Check if the query is asking for the current block height
        // Block Information by Block Height
      if (query.includes('get block info for height')) {
          const heightPattern = /get block info for height\s(\d+)/;
          const match = query.match(heightPattern);
          const height = match ? match[1] : null;
          if (height) {
              return { type: 'blockInfoByHeight', height };
          }
      }
  
      // Block Information by Block Hash
      else if (query.includes('get block info for hash')) {
          const hashPattern = /hash\s([a-zA-Z0-9]+)/;
          const match = query.match(hashPattern);
          const hash = match ? match[1] : null;
          return { type: 'blockInfoByHash', hash };
      }
  
      // Latest Block Information
      else if (query.includes('what is the latest block')) {
          return { type: 'latestBlock' };
      }

      // Transactions Count by Address
    if (query.includes('how many transactions for address')) {
      const addressPattern = /address\s([a-zA-Z0-9]+)/;
      const match = query.match(addressPattern);
      const address = match ? match[1] : null;
      return { type: 'txCountByAddress', address };
  } 

  // Transactions by Address
  else if (query.includes('list transactions for address')) {
      const addressPattern = /address\s([a-zA-Z0-9]+)/;
      const match = query.match(addressPattern);
      const address = match ? match[1] : null;
      return { type: 'txsByAddress', address };
  }

  // UTXOs by Address
  else if (query.includes('show utxos for address')) {
      const addressPattern = /address\s([a-zA-Z0-9]+)/;
      const match = query.match(addressPattern);
      const address = match ? match[1] : null;
      return { type: 'utxosByAddress', address };
  }

// Existing conditions follow...

    // Add more conditions as needed for different types of blockchain queries
    
    // Default response for unrecognized queries
    return { type: 'unknown' };
  }
  
  // Make the function available for import in other files
  module.exports = interpretQuery;