const assert = require('assert');
const ganache = require('ganache-core');
const Web3 = require('web3');
const compiledContract = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use 1 of the accounts above to deploy the contract
    inbox = await new web3.eth.Contract(compiledContract?.abi, accounts[0], {
        from: accounts[1], // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    }).deploy({ data: compiledContract?.evm.bytecode, arguments: ['Hi There!'] });

    // inbox = await new web3.eth.Contract(compiledContract?.abi)
    //     .deploy({ data: compiledContract?.abi.evm.bytecode, arguments: ['Hi There!'] })
    //     .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});