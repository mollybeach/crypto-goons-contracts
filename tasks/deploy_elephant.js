const fs = require('fs');
const deployments = require('../data/deployments');
/*  
write it task functions for these solidity functions:

  function setStart(bool _start) public onlyOwner returns (bool)
  function mint(uint256 _qty)
  function devMint() public onlyOwner 
  function mintFree(uint256 _qty) public canMintFree(_qty)
  function mintPublic(uint256 _qty) public payable canMint(_qty)

*/

task('deploy-elephant').setAction(async function () {

  const QTY = 1;
  const [deployer] = await ethers.getSigners();
  const genesisAddress = `0x84126F348a19557148581e3dc36Fc2C36e4c33C3`
  
   /*************** before deployment : *************/
    
    const NAME = "Elephant";
    const SYMBOL = "ELEPHANT"
    const BASE_URI = "ipfs://"
    console.log("beforeDeployment......");
    const factory = await ethers.getContractFactory('Elephant', deployer);
    const instance = await factory.deploy(NAME, SYMBOL, BASE_URI); //must have the same amount of arguments as the contract constructor
    

  /*************** after deployment : *************/
    
  //console.log("afterDeployment ......");
  //const instance = await ethers.getContractAt('Elephant',deployments.Elephant);

  /********call and await the instance to be deployed ********/
  await instance.deployed();

 /**************** test contract functions:  *************/
  //run  setStart Function 
  const setStart = await instance.callStatic.setStart();
  console.log(setStart.toString());
  console.log("setStart() passed successfully");

//run setAddress Function
  const runSetAddresses = await instance.callStatic.setAddresses(genesisAddress);
  console.log(runSetAddresses.toString());
  console.log("setAddresses() passed successfully");

  //run TotalSupply function
  const totalSupply = await instance.callStatic.totalSupply();
  console.log(totalSupply.toString());
  console.log("totalSupply() passed successfully");

   //run MintFunction
  const runMint = await instance.connect(deployer).mint(QTY);
  await runMint.wait();
  console.log("mint() passed successfully");

   //run devMintFunction
  const runDevMint = await instance.connect(deployer).devMint();
  await runDevMint.wait();
  console.log("runDevMint() passed successfully")
  
  //run mintFreeFunction
  const runMintFree = await instance.connect(deployer).mintFree(QTY);
  await runMintFree.wait();
  console.log("runMintFree() passed successfully");

   //run mintPublicFunction
  const runMintPublic = await instance.connect(deployer).mintPublic(QTY);
  await runMintPublic.wait();
  console.log("runMintPublic() passed successfully");

  console.log(`Deployed Elephant to: ${instance.address}`);
  deployments.Elephant = instance.address;
  
  //write Elephant to deployments json file 
  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
  console.log(json);
});
//yarn run hardhat deploy-elephant --network localhost

