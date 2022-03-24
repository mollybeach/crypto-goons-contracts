const deployments = require('../data/deployments');

task('mint-stack')
  .setAction(async function () {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt(
      'StakedPupz',
      deployments.stakedPupz,
    );

    const unstackStaking = await ethers.getContractAt(
        'UStackStaking',
        deployments.unstackFixedMain,
    )

    const stackStaking = await ethers.getContractAt(
        'StackStaking',
        deployments.stackFixedMain,
    )

    // const rateUnstack = ethers.utils
    //   .parseUnits('5',18)
    //   .div(ethers.BigNumber.from('6000'));

    // const expirationUnstack = ethers.BigNumber.from('372000');

    const rateStack = ethers.utils
      .parseUnits('50',18)
      .div(ethers.BigNumber.from('6000'));

    const expirationStack = ethers.BigNumber.from('18000');

    // duration should be: 585000 blocks
    // const tx = await instance
    //   .connect(sender)
    //   .mint(sender.address, ethers.utils.parseUnits("105210", 18));
    // await tx.wait();

    // const tx2 = await instance
    //   .connect(sender)
    //   .mint(sender.address, ethers.utils.parseUnits("3148950", 18));
    // await tx2.wait();

    // const setUnstackDuration = await unstackStaking 
    //   .connect(sender)
    //   .setExpiration(expirationUnstack);
    // await setUnstackDuration.wait();

    // const setUnstackRate = await unstackStaking
    //   .connect(sender)
    //   .setRate(rateUnstack);
    // await setUnstackRate.wait();

    // const unpauseUnstack = await unstackStaking
    //   .connect(sender)
    //   .unpause();
    // await unpauseUnstack.wait();

    const setStackDuration = await stackStaking
      .connect(sender)
      .setExpiration(expirationStack);
    await setStackDuration.wait();

    const setStackRate = await stackStaking
      .connect(sender)
      .setRate(rateStack);
    await setStackRate.wait();

    // const unpauseStack = await stackStaking
    //   .connect(sender)
    //   .unpause();
    // await unpauseStack.wait();
  });
