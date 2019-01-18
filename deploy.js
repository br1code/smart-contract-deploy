'use strict';

const Web3 = require('web3');
const HDWallerProvider = require('truffle-hdwallet-provider');

const config = require('./config');
const compiler = require('./src/compiler');
const deployer = require('./src/deployer');

const provider = new HDWallerProvider(config.phrase, config.network);

const web3 = new Web3(provider);

compiler.Compile(config.contractName, config.contractFileName, (contract) => {
    deployer.Deploy(web3, contract, config.arguments, config.address, config.gas);
});