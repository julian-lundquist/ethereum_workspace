const assert = require('assert');
const ganache = require('ganache-core');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());