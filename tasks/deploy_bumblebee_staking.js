const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-bumblebee-staking').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day

  const RATE = ethers.utils
    .parseUnits('4.5', 18)
    .div(ethers.BigNumber.from('6000'));

    const EXPIRATION = ethers.BigNumber.from('66000');

  const factory = await ethers.getContractFactory('BumblebeeStaking', deployer);
  const instance = await factory.deploy(
    deployments.halloweenBears,
    RATE,
    EXPIRATION,
    deployments.bumblebeeToken
  );
  await instance.deployed();

  console.log(`Deployed foxFixedMain to: ${instance.address}`);
  deployments.bumblebeeStakingMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});

task('set-berry-rewards').setAction(async function () {
    const [sender] = await ethers.getSigners();

    const RATE = ethers.utils
      .parseUnits('4.5', 18)
      .div(ethers.BigNumber.from('6000'));

    const EXPIRATION = ethers.BigNumber.from('66000');

    const instance = await ethers.getContractAt('BumblebeeStaking', deployments.bumblebeeStakingMainnet);

    const setRate = await instance.connect(sender).setRate(RATE);
    await setRate.wait();

    const setExpiration = await instance.connect(sender).setExpiration(EXPIRATION);
    await setExpiration.wait();
})