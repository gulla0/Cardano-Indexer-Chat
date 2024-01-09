const { processNaturalLanguageQuery } = require('./server');

// Test function
async function testProcessNaturalLanguageQuery() {
    // Test data
    const blockchainData = { /* your blockchain data here */ };
    const userQueryOld = "Current block height?";
    const userQueryCurrent = "Number of transactions in the current block?";

    // Call the function with the old query
    console.log("Testing with old query...");
    let response = await processNaturalLanguageQuery(blockchainData, userQueryOld);
    console.log("Response:", response);

    // Call the function with the current query
    console.log("Testing with current query...");
    response = await processNaturalLanguageQuery(blockchainData, userQueryCurrent);
    console.log("Response:", response);
}

// Run the test
testProcessNaturalLanguageQuery();