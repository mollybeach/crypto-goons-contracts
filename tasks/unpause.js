const deployments = require('../data/deployments');

task('unpause').setAction(async function () {

  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt(
    'Staking',
    deployments.unstackFixedRink,
  );

  const tx = await instance.connect(sender).unpause();
  await tx.wait();
});
