const deployments = require('../data/deployments');

task('reward-params')
  .addParam('duration')
  .setAction(async function ({ amount, duration }) {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt(
      'StackPoolTwo',
      deployments.stackRewardsMainnet,
    );

    // duration should be: 585000 blocks
    const tx = await instance
      .connect(sender)
      .setRewardParams(ethers.utils.parseUnits("4950000", 18), duration);
    await tx.wait();
  });
