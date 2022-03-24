const deployments = require('../data/deployments');

task('set-fox-rewards')
  .setAction(async function () {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt(
      'FoxStaking',
      deployments.foxFixedMain,
    );

    const rateUnstack = ethers.utils
      .parseUnits('10',18)
      .div(ethers.BigNumber.from('6000'));

    const expirationUnstack = ethers.BigNumber.from('360000');

    const setUnstackDuration = await instance 
      .connect(sender)
      .setExpiration(expirationUnstack);
    await setUnstackDuration.wait();

    const setUnstackRate = await instance
      .connect(sender)
      .setRate(rateUnstack);
    await setUnstackRate.wait();

    const unpauseUnstack = await instance
      .connect(sender)
      .unpause();
    await unpauseUnstack.wait();
});

const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-default-721').setAction(async function () {
    const [deployer] = await ethers.getSigners();
  
    const factory = await ethers.getContractFactory("DefaultErc721", deployer);
    const instance = await factory.deploy();
    await instance.deployed();
  
    console.log(`Deployed contract DefaultErc721 to: ${instance.address}`);
    deployments.DefaultErc721 = instance.address;
  
    const json = JSON.stringify(deployments, null, 2);
      fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
        flag: 'w',
    });
});

task('mint-default-721').setAction(async function () {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt("DefaultErc721", deployments.DefaultErc721);

   // let tokenUri = "a";
    for (i = 0; i < 1000; i++) {
      const purchase = await instance.connect(sender).buyTickets(MAX_TICKETS, instance.balanceOf(sender.address)) ;
      await purchase.wait();
    }
})