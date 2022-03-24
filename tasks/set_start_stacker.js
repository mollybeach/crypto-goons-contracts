const deployments = require('../data/deployments');

task('set-start-stacker').setAction(async function () {

  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt(
    'Stacker',
    deployments.stackerRink,
  );

  const setStart = await instance.connect(sender).setStart('true');
  await setStart.wait();
});
