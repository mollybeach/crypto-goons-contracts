const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-default-20').setAction(async function () {
    const [deployer] = await ethers.getSigners();
  
    const factory = await ethers.getContractFactory("DefaultErc20", deployer);
    const instance = await factory.deploy();
    await instance.deployed();
  
    console.log(`Deployed contract DefaultErc20 to: ${instance.address}`);
    deployments.DefaultErc20 = instance.address;
  
    const json = JSON.stringify(deployments, null, 2);
      fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
        flag: 'w',
    });
});

task('mint-default-20').setAction(async function () {
    const [sender] = await ethers.getSigners();

    const instance = await ethers.getContractAt(
      "DefaultErc20",
      deployments.DefaultErc20 
      );
    
    let amount = ethers.utils.parseUnits("1000000000000000000000000000000000000000000000000000", 18);

    const mint = await instance.connect(sender).mint(sender.address, amount);
    await mint.wait();
})