const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let newContract;

beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use 1 of the accounts above to deploy the contract
    newContract = await new web3.eth.Contract(interface, accounts[0], {
        from: accounts[1], // default from address
        gas: 1500000,
        gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
        data: bytecode
    });
    // newContract.deploy({ data: '0x' + bytecode, arguments: ['Hi There!'] })

    console.log(newContract)

    // console.log(myContract['_parent']['methods'].message.call())

    // inbox = await new web3.eth.Contract(compiledContract?.abi)
    //     .deploy({ data: compiledContract?.abi.evm.bytecode, arguments: ['Hi There!'] })
    //     .send({ from: accounts[0], gas: '1000000' });
});

// describe('Inbox', () => {
//     it('deploys a contract', () => {
//         // console.log(inbox)
//         assert.ok(newContract.options.address)
//     });
//
//     it('contains a default message',async () => {
//         // const sendMessage = await myContract['_parent']['methods'].setMessage('abc').send();
//         const message = await newContract.methods.message().call();
//         // assert.deepStrictEqual(message, 'Hi There!')
//         console.log(message)
//     });
// });