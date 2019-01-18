module.exports = function(address, abi) {
    'use strict';

    const fs = require('fs');
    const utils = require('../utils');

    let data = `Contract deployed to ${address}\n\nAbi: ${abi}`;
    let path = utils.rootDirectory + '/' + 'contractData.txt';

    fs.writeFile(path, data, (err) => {
        if (err) utils.exitWithMessage('Error, the contract could not be exported');
        utils.exitWithMessage('Contract deployed and exported successfully.\nYou can find the contract data in ' + path);
    });
};