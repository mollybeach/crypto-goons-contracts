const fs = require('fs');
const deployments = require('../data/deployments');
/*  
write it task functions for these solidity functions:

    function setSetPreSaleStart(bool _start) public onlyOwner {
    function setStart(bool _start) public onlyOwner 
    function setPublicStart(bool _start) public onlyOwner 
    function presaleMint(uint256 _times, uint256 _cropAmount) public 
    function publicMint(uint256 _times, uint256 _cropAmount) public
    function devMint(uint256 _times) public onlyOwner 
    function mint(uint256 _times) payable public 
    function withdrawCrop() public onlyOwner
*/

task('deploy-fud-farm-genesis').setAction(async function () {

    const [deployer] = await ethers.getSigners();
    const alienfarmAddress = `0x898291F4D1eFF4AD35d6F0A52F7D85eE12c514B2`
    const cropAddress = `0xD38022915DD983785e09381aDFaCD373E7DF7dd3`;
    const stakeAddress = `0xA096Fa33C27A9F6eE2E0fCeDBaA736dFb1288a61`;

   /*************** before deployment : *************/
    
    const NAME = "AlienFarmGenesis";
    const SYMBOL = "AlienFarmGenesis"
    // const CROP_AMOUNT = 400000000000000000000;
    // approximately 6000 blocks per day
    const CROP_AMOUNT = ethers.utils
    .parseUnits('9', 18)
    .div(ethers.BigNumber.from('6000'));

    const TIMES = 1;
    const BASE_URI = "ipfs://"
    console.log("beforeDeployment......");
    const factory = await ethers.getContractFactory('AlienFarmGenesis', deployer);
    const instance = await factory.deploy(NAME, SYMBOL, BASE_URI, alienfarmAddress, cropAddress, stakeAddress ); //must have the same amount of arguments as the contract constructor

  /*************** after deployment : *************/
    
  //console.log("afterDeployment ......");
  //const instance = await ethers.getContractAt('AlienFarmGenesis',deployments.AlienFarmGenesis);

  /********call and await the instance to be deployed ********/
    await instance.deployed();

 /**************** test contract functions:  *************/
  //run setPreSaleStart Function 
    const runSetPreSaleStart = await instance.callStatic.setPresaleStart(true);
    console.log(runSetPreSaleStart.toString());
    console.log(" setPreSaleStartpassed successfully");
 //run  setStart Function 
    const runSetStart = await instance.callStatic.setStart(true);
    console.log(runSetStart.toString());
    console.log("setStart() passed successfully");
  //run setPublicStart Function 
    const runSetPublicStart = await instance.callStatic.setPublicStart(true);
    console.log(runSetPublicStart.toString());
    console.log("setPublicStart() passed successfully");

//run preSale Mint Function
    const runPresaleMint = await instance.callStatic.presaleMint(TIMES, CROP_AMOUNT);
    console.log(runPresaleMint.toString());
    console.log("presaleMint() passed successfully");

//run public Mint Function
    const runPublicMint = await instance.callStatic.publicMint(TIMES, CROP_AMOUNT);
    console.log(runPublicMint.toString());
    console.log("publicMint() passed successfully");


//run devMint Function
    const runDevMint = await instance.callStatic.devMint(TIMES);
    console.log(runDevMint.toString());
    console.log("devMint() passed successfully");


//run mint Function
    const runMint = await instance.callStatic.mint(TIMES);
    console.log(runMint.toString());
    console.log("mint() passed successfully");


// function withdrawCrop() public onlyOwner
//run withdrawCrop Function
    const runWithdrawCrop = await instance.callStatic.withdrawCrop();
    console.log(runWithdrawCrop.toString());
    console.log("withdrawCrop() passed successfully");


//run withdrawAlienFarmGenesis function
    //const runWithdrawAlienFarmGenesis = await instance.connect(deployer).withdrawAlienFarmGenesis();
   // await runWithdrawAlienFarmGenesis.wait();

    console.log(`Deployed AlienFarmGenesis to: ${instance.address}`);
    deployments.AlienFarmGenesis = instance.address;





    //write AlienFarmGenesis to deployments json file 
    const json = JSON.stringify(deployments, null, 2);
    fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
        flag: 'w',
    });
    console.log(json);
});
//yarn run hardhat deploy-fud-farm-genesis --network localhost

