const fs = require('fs');
const deployments = require('./data/deployments');

module.exports = [
    deployments.stakedPupzMainnet,
    deployments.stackv2LpTokenMainnet
]