const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-staked-stacked-pupz').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day
  const RATE = ethers.utils
    .parseUnits('25', 18)
    .div(ethers.BigNumber.from('6000'));

  const EXPIRATION = ethers.BigNumber.from('3600000');

  const instance = await ethers.getContractAt(
    'StackStaking',
    deployments.stackFixedMain,
  );
  
  await instance.deployed();

  console.log(`Deployed StakedPupz to: ${instance.address}`);
  deployments.stakedStackedPupzMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});

task('set-stack-rate').setAction(async function () {
  const [sender] = await ethers.getSigners();

  const RATE = ethers.utils
    .parseUnits('25', 18)
    .div(ethers.BigNumber.from('6000'));

  const EXPIRATION = ethers.BigNumber.from('372000');

  const instance = await ethers.getContractAt('StackStaking', deployments.stackFixedMain);

  const setRate = await instance.connect(sender).setRate(RATE);
  await setRate.wait();

  // const setExpiration = await instance.connect(sender).setExpiration(EXPIRATION);
  // await setExpiration.wait();

  // const unstack = await ethers.getContractAt('UStackStaking', deployments.unstackFixedMain);

  // const setUExpiration = await unstack.connect(sender).setExpiration(EXPIRATION);
  // await setUExpiration.wait();
})