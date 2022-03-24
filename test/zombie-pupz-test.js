const { expect } = require('chai');
//import way to deal with bigNumber
var chai = require('chai');
const BN = require('bn.js');
const { ethers } = require("hardhat"); 
chai.use(require('chai-bn')(BN));
const deployments = require('../data/deployments');


/*  write it test functions for these solidity functions:
        function totalSupply() public view virtual returns (uint256)
        function changePrice(uint256 _newPrice) public onlyOwner
        function changeBatchSize(uint256 _newBatch) public onlyOwner
        function tokenURI(uint256 tokenId) public view virtual override returns (string memory)
        function setTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyOwner
        function setStart(bool _start) public onlyOwner
        function devMint(uint256 _times) public onlyOwner
        function mintPup(uint256 _times) payable public
*/

describe('ZombiePupzContract Unit Test', function () {
    let accounts, contractOwner, defaultErc20, zombiePupzContract;
    before(async function () {
        accounts = await ethers.getSigners(); 
        contractOwner = accounts[0];
        let ZombiePupzContract = await ethers.getContractFactory('ZombiePupz', contractOwner);
        zombiePupzContract = await ZombiePupzContract.deploy(deployments.DefaultErc20);
        await zombiePupzContract.deployed();
    });

    beforeEach(async function () {
        let begin = await zombiePupzContract.connect(contractOwner).setStart(contractOwner, ethers.utils.parseUnits("10000000000", 18));
        await begin.wait();
    });
    //check if contract is strted 
    it(' ZombiePupzContract started succesffully ', async function () {
        let mint = await zombiePupzContract.connect(contractOwner).setStart(contractOwner, ethers.utils.parseUnits("10000000000", 18));
        await mint.wait();
    });
    /*
    //checkTotalSupply
    it(' checkTotalSupply', async function () {
        expect((await defaultErc20.callStatic.totalSupply()).toString()).to.equal('5555');
        console.log(await defaultErc20.callStatic.totalSupply());
    });
    //check if price is changed
    it(' checkPrice', async function () {
        expect((await zombiePupzContract.callStatic.price()).toString()).to.equal('1');
    })  
     //check if contract is ended
*/
});