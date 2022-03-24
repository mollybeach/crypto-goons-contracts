const deployments = require('../data/deployments');

task('stake-pup').setAction(async function () {

  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt(
    'Staking',
    deployments.unstackFixedRink,
  );
  const erc721 = await ethers.getContractAt(
    'StackedPupz',
    deployments.stackedPupzRink,
  );
  const approval = await erc721.connect(sender).setApprovalForAll(instance.address, true);
  await approval.wait();
  const tx = await instance.connect(sender).deposit([33]);
  await tx.wait();
});
