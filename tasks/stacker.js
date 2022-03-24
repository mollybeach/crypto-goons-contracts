const deployments = require('../data/deployments');

task('stacker').setAction(async function () {

  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt(
    'Stacker',
    deployments.stackerRink,
  );

  const stack = await instance.connect(sender).stack([8, 9, 10]);
  await stack.wait();
});
