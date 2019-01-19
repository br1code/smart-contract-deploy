module.exports = function(address, abi, name) {
    'use strict';

    const fs = require('fs');
    const utils = require('../utils');

    let data = JSON.stringify({address, abi}, null, 4);
    let path = `${utils.rootDirectory}/exports/${name}.json`;

    fs.writeFile(path, data, (err) => {
        if (err) utils.exitWithMessage('Error, the contract could not be exported');
        utils.exitWithMessage('Contract deployed and exported successfully.\nYou can find the contract data in ' + path);
    });
};