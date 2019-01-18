'use strict';

function exitWithMessage(message) {
    console.error(message);
    process.exit();
}

module.exports = { 
    exitWithMessage, 
    rootDirectory: __dirname
};