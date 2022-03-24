const deployments = require('../data/deployments');

task('calculate-rewards').setAction(async function () {

  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt(
    'Staking',
    deployments.unstackFixedRink,
  );

  const erc721 = await ethers.getContractAt(
    'StackedPupz',
    deployments.stackedPupzRink,
  );
//   const approval = await erc721.connect(sender).setApprovalForAll(instance.address, true);
//   await approval.wait();
//   const tx = await instance.connect(sender).deposit([36, 37]);
//   await tx.wait();
  
  console.log(sender.address);

  const ms = 5000;

  const reward2 = await (await instance.connect(sender).claimRewards([36,37])).wait();
  await new Promise(resolve => setTimeout(resolve, ms));

//   const reward3 = await (await instance.connect(sender).claimRewards([36, 36, 36, 36])).wait();
//   await new Promise(resolve => setTimeout(resolve, ms));

//   const reward4 = await (await instance.connect(sender).claimRewards([36, 36, 36, 36])).wait();
//   await new Promise(resolve => setTimeout(resolve, ms));

//   const reward5 = await (await instance.connect(sender).claimRewards([36, 36, 36, 36])).wait();
//   await new Promise(resolve => setTimeout(resolve, ms));


  console.log(reward2.toString())
});
