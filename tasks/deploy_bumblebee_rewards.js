const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-bumblebee-lp').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day

  const factory = await ethers.getContractFactory('BumblebeeRewards', deployer);
  const instance = await factory.deploy(
    deployments.bumblebeeToken,
    deployments.bumblebeeUniV2,
  );
  await instance.deployed();

  console.log(`Deployed stackRewardsMainnet to: ${instance.address}`);
  deployments.berryRewardsMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
