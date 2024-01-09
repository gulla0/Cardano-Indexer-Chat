require('dotenv').config();
const { interpretQuery, extractBlockHeight, extractBlockHash, extractAddress } = require('./queryInterpreter');

function checkResult(value, expected) {
  if (value !== expected) {
    console.error(`Expected ${expected}, but got ${value}`);
  }
}

const blockHeight = extractBlockHeight('Get block info for height 12345');
checkResult(blockHeight, '12345');

const blockHash = extractBlockHash('Get block info for hash abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890');
checkResult(blockHash, 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890');

const address = extractAddress('How many transactions for address addr1q9mtr6q50fwdq3lfs374fnvnn38sdtmtsvlmmvnxcprtgyewhc7jaaza9u5np8cqnqyuykz5ku7arhvz66kzs2egxt7q4u4zyg?');
checkResult(address, 'addr1q9mtr6q50fwdq3lfs374fnvnn38sdtmtsvlmmvnxcprtgyewhc7jaaza9u5np8cqnqyuykz5ku7arhvz66kzs2egxt7q4u4zyg');

// Add your own test cases for interpretQuery
interpretQuery('Number of transactions in latest block?').then(queryResult => {
  console.log('queryResult:', JSON.stringify(queryResult, null, 2)); // This line is for testing purposes.
  checkResult(queryResult.type, 'Expected result');
}).catch(error => {
  console.error('Error during interpretQuery:', error);
});