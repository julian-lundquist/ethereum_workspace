const assert = require('assert');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const testAccountMnemonic = 'happy admit ethics home invest normal family sick waste heavy fiction orient';
const rinkebyNetworkProviderUrl = 'https://rinkeby.infura.io/v3/29a2c2b7f88148b39a64500dfdbcbd42';

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: testAccountMnemonic
    },
    providerOrUrl: rinkebyNetworkProviderUrl
});

const web3 = new Web3(provider);

let lotteryContract;
const account = web3.eth.accounts.privateKeyToAccount('f75a32919f3a10f41a7b33c9df4080e443a297ad3b8166a1a800e9c1a17a7144');

beforeEach(async () => {
    // Use 1 of the accounts above to deploy the contract
    lotteryContract = await new web3.eth.Contract(interface, account.address)
});

describe('Lottery', () => {
    it('deploys a contract', () => {
        assert.ok(lotteryContract.options.address);
    });
});

after('Reset', () => {
    provider.engine.stop();
});