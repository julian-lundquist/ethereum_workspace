const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let lotteryContract;
let accounts;

beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use 1 of the accounts above to deploy the contract
    lotteryContract = await new web3.eth.Contract(interface, accounts[0])
});

describe('Lottery', () => {
    it('deploys a contract', () => {
        assert.ok(lotteryContract.options.address);
    });

    it('allows one account to enter lottery', async () => {
        await lotteryContract.methods.enterLottery().call({
            from: accounts[0],
            value: web3.utils.toWei('0.001', 'ether')
        });

        const players = await lotteryContract.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.deepStrictEqual(accounts[0], players[0]);
        assert.deepStrictEqual(1, players.length);
    });
});