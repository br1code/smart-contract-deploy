'use strict';

const Web3 = require('web3');
const HDWallerProvider = require('truffle-hdwallet-provider');

const utils = require('../utils');
const compiler = require('./compiler');
const exportContract = require('./exportContract');

/**
 * Compile, deploy and export a contract in the root directory
 * @param {Object} config - Some configurations to compile and deploy the contract
 */
async function Deploy(config) {
    let provider = new HDWallerProvider(config.transaction.phrase, config.transaction.network);
    let web3 = new Web3(provider);

    let compiledContract = compiler.Compile({ 
        name: config.contract.name, 
        fileName: config.contract.fileName 
    });

    console.log('Fetching accounts ...');

    let account = utils.selectAccount(await web3.eth.getAccounts(), config.transaction.address);

    console.log(`Attempting to deploy contract from account ${account} ...`);

    let contract = await new web3.eth.Contract(compiledContract.abi)
        .deploy({ data: compiledContract.bytecode, arguments: config.contract.arguments })
        .send({ from: account, gas: config.transaction.gas || '1000000' });

    console.log('Contract deployed successfully');

    exportContract(contract, config.contract.name);
}

module.exports = { Deploy };