function createGptPrompt(blockchainData) {
    if (blockchainData.type === 'chainTip') {
      return 'Provide a summary of the latest block on the Cardano blockchain including the block height.';
    } else if (blockchainData.type === 'blockHash') {
      return `Provide details for the Cardano block with hash ${blockchainData.hash}, including transactions and size.`;
    } else if (blockchainData.type === 'transactionId') {
      return `Describe the transaction with ID ${blockchainData.txId} on the Cardano blockchain, including inputs, outputs, and fees.`;
    } else if (blockchainData.type === 'addressBalance') {
      return `What is the current balance of the Cardano address ${blockchainData.address}? Include the latest transactions.`;
    }
    // Add more conditions for different types of blockchain data
    
    // Default prompt for unrecognized data types
    return 'Please provide more information.';
  }
  
  // Export the function for use in other files
  module.exports = createGptPrompt;
  


