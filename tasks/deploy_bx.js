const fs = require('fs');
const deployments = require('../data/deployments');
/*  
write it task functions for these solidity functions:

    function setStart(bool _start) public onlyOwner returns (bool);
    function setStart() public onlyOwner
    function totalSupply() public view virtual override returns (uint256) 
    function getLastBredCuredCat(uint256 tokenId) public view returns (uint256)
    function breedBX(uint256[] calldata _tokenIds)  public 
*/

task('deploy-bx').setAction(async function () {

    const QTY = 1;
    const [deployer] = await ethers.getSigners();
    const chinchillaAddress = `0xaAdBA140Ae5e4c8a9eF0Cc86EA3124b446e3E46A`
    const foxAddress = `0x1c579006cd499871ac39aa2bf787462de603936c`;
   // const zeroAddress = `0x0000000000000000000000000000000000000000`;
   /*************** before deployment : *************/
    
    const NAME = "BX";
    const SYMBOL = "BX"
    const BASE_URI = "ipfs://"
    console.log("beforeDeployment......");
    const factory = await ethers.getContractFactory('BX', deployer);
    const instance = await factory.deploy(NAME, SYMBOL, BASE_URI); //must have the same amount of arguments as the contract constructor
  /*************** after deployment : *************/
    
  //console.log("afterDeployment ......");
  //const instance = await ethers.getContractAt('BX',deployments.BX);

  /********call and await the instance to be deployed ********/
    await instance.deployed();

 /**************** test contract functions:  *************/
 //run  setStart Function 
    const setStart = await instance.callStatic.setStart();
    console.log(setStart.toString());
    console.log("setStart() passed successfully");

//run setAddress Function
    const runSetAddresses = await instance.callStatic.setAddresses(chinchillaAddress, foxAddress);
    console.log(runSetAddresses.toString());
    console.log("setAddresses() passed successfully");

//run TotalSupply function
    const totalSupply = await instance.callStatic.totalSupply();
    console.log(totalSupply.toString());
    console.log("totalSupply() passed successfully");
// run getLastBredCuredCat function
    const getLastBredCuredCat = await instance.callStatic.getLastBredCuredCat(1);
    console.log(getLastBredCuredCat.toString());
//run MintFunction
    const runBreedBX = await instance.connect(deployer).breedCuredCat(QTY);
    await runBreedBX.wait();
    console.log("mint() passed successfully");

//run withdrawBX function
    const runWithdrawBX = await instance.connect(deployer).withdrawBX();
    await runWithdrawBX.wait();
    console.log(`Deployed BX to: ${instance.address}`);
    deployments.BX = instance.address;
    //write BX to deployments json file 
    const json = JSON.stringify(deployments, null, 2);
    fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
        flag: 'w',
    });
    console.log(json);
});
//yarn run hardhat deploy-cured-meowz --network localhost

