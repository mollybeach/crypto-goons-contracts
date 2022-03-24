const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-fox-rewards').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day

  const factory = await ethers.getContractFactory('FoxPoolTwo', deployer);
  const instance = await factory.deploy(
    deployments.foxMainnet,
    deployments.slpFoxMain,
  );
  await instance.deployed();

  console.log(`Deployed stackRewardsMainnet to: ${instance.address}`);
  deployments.foxRewardsMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
