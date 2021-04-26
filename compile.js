const solc = require('solc');
const fs = require('fs');
const path = require('path');

const fileName = 'Inbox.sol'
const inboxPath = path.resolve(__dirname, 'contracts', fileName);
const data = fs.readFileSync(inboxPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'content.sol': {
            content: data
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

// console.log(solc.compile(JSON.stringify(input)))
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output)

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['content.sol']) {
    console.log(
        contractName +
        ': ' +
        output.contracts['content.sol'][contractName].evm.bytecode.object
    );
}

module.exports = output;