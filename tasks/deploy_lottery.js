const fs = require('fs');
const deployments = require('../data/deployments');
//import bigNumber 

task('deploy-lottery').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  const stackAddress = deployments.DefaultErc20;
  const erc20 = await ethers.getContractAt('DefaultErc20', deployments.DefaultErc20);
  const factory = await ethers.getContractFactory('Lottery', deployer);
  //before deploy : 
  const instance = await factory.deploy(stackAddress);
  //after deploy :
  //const instance = await ethers.getContractAt('Lottery',deployments.Lottery);

  const MAX_TICKETS = ethers.BigNumber.from(1);
  const PRICE = ethers.utils.parseUnits("50",18);
  const ALLOWED = ethers.utils.parseUnits("100000000000000",18);
  await instance.deployed();

  //call the approval function from Erc20 openZeppelin contract
  const approval = await erc20.connect(deployer).approve(instance.address, ALLOWED);
  await approval.wait();

  //run start lotto function
  const runStartLotto = await instance.connect(deployer).startLotto();
  await runStartLotto.wait();

  //run check started Function 
  const runCheckStarted = await instance.callStatic.checkStarted();
  console.log(runCheckStarted.toString());

  //run buyTickets function 
 // for (i = 0; i < 1000; i++) {
  const runBuyTickets = await instance.connect(deployer).buyTickets(MAX_TICKETS, PRICE);
  await runBuyTickets.wait();

  // run draw function 
  const runDraw = await instance.connect(deployer).draw();
  await runDraw.wait();

  // run endLotto function 
  const runEndLotto = await instance.connect(deployer).endLotto();
  await runEndLotto.wait();

  //run withdrawTokens function
  const runWithdrawTokens = await instance.connect(deployer).withdrawTokens();
  await runWithdrawTokens.wait();

  console.log(`Deployed Lottery to: ${instance.address}`);
  deployments.Lottery = instance.address;
  
  //write Lottery to deployments json file 
  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
  console.log(json);
});
//yarn run hardhat deploy-lottery --network localhost

