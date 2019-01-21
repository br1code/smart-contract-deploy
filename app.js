const utils = require('./utils');
const config = require('./config');
const deployer = require('./src/deployer');

utils.validateConfig(config);

deployer.Deploy(config).catch((err) => {
    console.error('Error: ' + err.message);
});