'use strict';

const utils = require('../utils');
const exportContract = require('./exportContract');

/**
 * Deploy and export a contract in the root directory
 * @param {Web3} web3 - Web3 instance with a provider
 * @param {Object} contract - Compiled contract object
 * @param {Array} contractArguments - Arguments of the contract constructor
 * @param {String} address - Account address to use - Optional - Default: First account given by the phrase
 * @param {String} gas - Gas to use in the deploy transaction
 */
async function Deploy(web3, contract, contractArguments, address, gas) {
    if (!web3 || !contract)
        utils.exitWithMessage('Web3 instance and contract are required');

    const accounts = await web3.eth.getAccounts();
    const account = selectAccount(accounts, address);

    console.log(`Attempting to deploy contract from account ${account} ... \n`);
    
    const deployedContract = await new web3.eth.Contract(contract.abi)
        .deploy({ data: contract.bytecode, arguments: contractArguments })
        .send({ from: account, gas: gas || '1000000' })

    exportContract(deployedContract.options.address, JSON.stringify(contract.abi, null, 4));
}

function selectAccount(accounts, address) {
    if (!address) return accounts[0];
    return accounts.find(a => a === address) || accounts[0];
}

module.exports = { Deploy };