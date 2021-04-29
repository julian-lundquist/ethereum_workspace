const solc = require('solc');
const fs = require('fs');
const path = require('path');

const fileName = 'Lottery.sol'
const inboxPath = path.resolve(__dirname, 'contracts', fileName);
const inboxData = fs.readFileSync(inboxPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'content.sol': {
            content: inboxData
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output)

const interface = output.contracts['content.sol'].Lottery.abi;
const bytecode = output.contracts['content.sol'].Lottery.evm.bytecode.object;

module.exports = {
    interface,
    bytecode,
};

// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['inbox.sol']) {
//     console.log(
//         contractName +
//         ': ' +
//         output.contracts['inbox.sol'][contractName].evm.bytecode.object
//     );
//     console.log(output.contracts['inbox.sol'][contractName])
//     module.exports = output.contracts['inbox.sol'][contractName];
// }