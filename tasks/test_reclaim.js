const { ethers } = require('ethers');
const deployments = require('../data/deployments');

task('test-reclaim').setAction(async function () {

  const blockNumber = ethers.provider.getBlock("latest");

  console.log(blockNumber.blockNumber.toString());

  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt(
    'ERC721Farm',
    deployments.bugzOld,
  );

  const erc721 = await ethers.getContractAt(
      'ZombiePupz',
      deployments.zpupzMainnet
  )

  const RATE = ethers.utils.parseUnits("10000000000000000000000000000000000000", 18);
  
//   const EXPIRATION = ethers.utils.BigNumber.from("")

  const tokenId = 426


  const approval = await erc721.connect(sender).setApprovalForAll(instance.address, true);
  await approval.wait();

  const deposit = await instance.connect(sender).deposit([tokenId]);
  await deposit.wait();

  const tx = await instance.deposit([tokenId]);

  const depositBlock = deposit.blockNumber;

  console.log(depositBlock);

//   const setRate = await instance.connect(sender).setRate(RATE);
//   await setRate.wait();

//   // MUST BE EXACT BLOCK NUMBER 
//   const setDuration = await instance.connect(sender).setDuration(EXPIRATION);
//   await setDuration.wait();

//   // need to make sure this fires 1 block after the setDuration 
//   const withdraw = await instance.connect(sender).withdraw([tokenId]);
//   await withdraw.wait();
});
