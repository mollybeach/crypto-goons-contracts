const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-stacked-pupz').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  const name = "UnStackedPupz";
  const symbol = "USTACK"
  const baseURI = "ipfs://QmNqFAcD5HBdnEHJaKbDGuTFvqu8BvBVgx8J3G1MbNZUD4/"

  const factory = await ethers.getContractFactory('StackedPupz', deployer);

  const instance = await factory.deploy(
    name,
    symbol,
    baseURI,
  );

  await instance.deployed();

  console.log(`Deployed Stacked Pupz Rink to: ${instance.address}`);
  deployments.stackedPupzRink = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
