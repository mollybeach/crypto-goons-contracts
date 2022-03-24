const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-stacker').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  const name = "StackedPupz";
  const symbol = "STACK"
  const baseURI = "ipfs://QmWf3ywafrdzWx6QjUJiRe6NqMkb28rfPj3oBBkokTL199/"

  const factory = await ethers.getContractFactory('Stacker', deployer);

  const instance = await factory.deploy(
    name,
    symbol,
    deployments.stackedPupzMainnet,
    baseURI,
  );

  await instance.deployed();

  console.log(`Deployed stackerMainnet to: ${instance.address}`);
  deployments.stackerMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
