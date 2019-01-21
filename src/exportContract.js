'use strict';

const fs = require('fs');
const utils = require('../utils');

/**
 * Exports a contract in JSON format in the root directory
 * @param {Contract} contract - Contract instance
 * @param {String} name - The name of the contract < Ex: contract ContractName { } >
 */
function exportContract(contract, name) {
    let contractData = {
        address: contract.options.address, 
        abi: contract.options.jsonInterface
    };

    let data = JSON.stringify(contractData, null, 4);
    let path = `${utils.rootDirectory}/exports/${name}.json`;

    console.log('Exporting the contract ...');

    fs.writeFileSync(path, data);

    console.log('Contract exported successfully\nYou can find the contract data in ' + path);
}

module.exports = exportContract;