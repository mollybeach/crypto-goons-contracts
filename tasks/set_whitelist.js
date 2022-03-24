const deployments = require('../data/deployments');

task('set-whitelist')
  .setAction(async function () {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt(
      'StakedPupz',
      deployments.stakedPupzRink,
    );

    // duration should be: 585000 blocks
    const tx = await instance
      .connect(sender)
      .setWhitelist([sender.address]);
    await tx.wait();

    const mint = await instance
      .connect(sender)
      .mint(deployments.unstackFixedRink, ethers.utils.parseUnits("10000000", 18));
    await mint.wait();
  });
