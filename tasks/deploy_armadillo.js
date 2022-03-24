const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-armadillo').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  const name = "armadillo";
  const symbol = "ARMD"
  const baseURI = "ipfs://QmQSYiRMmF7KzVCiAMetjuY1b9pJqCgjzeVsJmFSpiwkms/"

  const factory = await ethers.getContractFactory('Armadillo', deployer);

  const instance = await factory.deploy(
    name,
    symbol,
    baseURI,
  );

  await instance.deployed();

  console.log(`Deployed Stacked Pupz Rink to: ${instance.address}`);
  deployments.Armadillo = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
