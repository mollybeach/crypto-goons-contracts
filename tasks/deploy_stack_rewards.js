const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-stack-rewards').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day
  // factory

  const factory = await ethers.getContractFactory('StackPoolTwo', deployer);
  const instance = await factory.deploy(
    deployments.stakedPupzMainnet,
    deployments.stackv2LpTokenMainnet,
  );
  await instance.deployed();

  console.log(`Deployed stackRewardsMainnet to: ${instance.address}`);
  deployments.stackRewardsMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
