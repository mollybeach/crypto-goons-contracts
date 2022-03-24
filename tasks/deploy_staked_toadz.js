const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-staked-pupz').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day
  const RATE = ethers.utils
    .parseUnits('5', 18)
    .div(ethers.BigNumber.from('6000'));

  const EXPIRATION = ethers.BigNumber.from('3600000');

  const factory = await ethers.getContractFactory('StakedPupz', deployer);
  const instance = await factory.deploy(
    deployments.stackedPupzMainnet,
    RATE,
    EXPIRATION,
  );
  await instance.deployed();

  console.log(`Deployed StakedPupzMainnet to: ${instance.address}`);
  deployments.stakedPupzMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
