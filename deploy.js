const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const testAccountMnemonic = 'happy admit ethics home invest normal family sick waste heavy fiction orient';
const rinkebyNetworkProviderUrl = 'https://rinkeby.infura.io/v3/29a2c2b7f88148b39a64500dfdbcbd42';

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: testAccountMnemonic
    },
    providerOrUrl: rinkebyNetworkProviderUrl
});

const web3 = new Web3(provider);

const deploy = async () => {
    // const accounts = await web3.eth.getAccounts();

    const account = web3.eth.accounts.privateKeyToAccount('f75a32919f3a10f41a7b33c9df4080e443a297ad3b8166a1a800e9c1a17a7144');
    console.log(account)

    console.log('Attempting to deploy from: ', account.address);

    const myContract = new web3.eth.Contract(interface)

    // console.log('Private key: ', accounts[0].privateKey)

    const myContractTx = myContract.deploy({
        data: bytecode,
        arguments: ['Hi There!']
    });

    const signPromise = account.signTransaction({
        to: account.address,
        gas: 1500000,
        gasPrice: "20000000000",
        data: myContractTx.encodeABI(),
        chain: 'rinkeby',
        hardfork: 'chainstart'
    });

    signPromise.then((signedTx) => {
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
        sentTx.on("receipt", receipt => {
            // do something when receipt comes back
            console.log(receipt)
        });
        sentTx.on("error", err => {
            // do something on transaction error
            console.log(err)
        });
    }).catch((err) => {
        // do something when promise fails
        console.log(err)
    });

    await provider.engine.stop();
}

deploy();
