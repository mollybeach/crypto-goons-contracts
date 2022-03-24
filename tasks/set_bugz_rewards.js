const deployments = require('../data/deployments');

task('set-bugz-rewards')
  .setAction(async function () {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt(
      'BugzStaking',
      deployments.bugzFixedMain,
    );

    const rateUnstack = ethers.utils
      .parseUnits('12',18)
      .div(ethers.BigNumber.from('6000'));

    const expirationUnstack = ethers.BigNumber.from('180000');

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
