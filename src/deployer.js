'use strict';

const utils = require('../utils');
const compiler = require('./compiler');
const exportContract = require('./exportContract');

/**
 * Compile, deploy and export a contract in the root directory
 * @param {Web3} web3 - Web3 instance with a provider
 * @param {Object} config - Some configurations to compile and send the transaction
 */
async function Deploy(web3, config) {
    if (!web3 || !config || !config.transaction.phrase || !config.transaction.network)
        utils.exitWithMessage("Web3 instance and contract configuration are required");

    const contract = compiler.Compile(config.contract.name, config.contract.fileName);
    const accounts = await web3.eth.getAccounts();

    if (!accounts.length)
        utils.exitWithMessage("There was a problem getting the accounts, check your config file");

    const account = utils.selectAccount(accounts, config.transaction.address);

    console.log(`Attempting to deploy contract from account ${account} ... \n`);

    const deployedContract = await new web3.eth.Contract(contract.abi)
        .deploy({ data: contract.bytecode, arguments: config.contract.arguments })
        .send({ from: account, gas: config.transaction.gas || '1000000' });
    
    exportContract(deployedContract.options.address, contract.abi, config.contract.name);
}

module.exports = { Deploy };