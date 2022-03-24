# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```


THE RULES OF GOOD PFP COLLECTION/PONZINOMICS DESIGN 
1. Keep up with the trends, this is why we hire a crack marketing team to check tools like 'icy', keep up with NFT twitter, be in trading groups, talk to community members of different discords, and track volume/sales metrics on OpenSea 
2. They then tell our artist (or artists) what kind of art to produce and the artist will produce it 
3. They then will communicate to the devs what kind of tokenomics/total supply/ponzinomics we must include in the contract. 
SECTION A: PFP COLLECTION TOKENOMICS 
-- profile picture collections are only as valuable as scarce as they appear 
    -- this means that each collection should have as few copies as possible, so rather than having a total supply of 10,000 it's better to have a lower total supply, usually 6,000 or less. 
    -- within the collection, there should be a skewed distribution of traits. For example, let's say that a pfp collection has attributes including a BACKGROUND, BODY, EYEWEAR, MOUTH, AND ACCESSORIES. Within EACH of these attributes there should be between 5 - 10 different ASSETS and a differential distribution of EACH ASSET within. So, within eyewear let's say there are 5 assets. 3 of them should be common (making up 80 - 85% of the 6,000 total supply) and 2 of them are 'rare' (making up 5 - 15% of the 6,000 total supply)

SECTION B: PONZINOMICS 
-- the current trend for NFT collections is to have a 'DeFi' component. 'DeFi' just means PASSIV INCOOOOOOM. aka, deposit your NFT into a staking pool and earn a token. For example, with ZombiePupz, you can deposit your ZombiePup into a staking pool and earn 10 $BUGZ a day. Well, in our paradigm 
command line shit 
1. mkdir ${enter name of new project}
2. cd ${''}
3. hardhat init 
    a. use all the defaults 
4. yarn install 
5. copy the packaage.json from a previous project into current package.json
6. yarn install 
7. setup your .env 


contract shit 
1. just use the same erc721 minting contract from the previous project. (in this case it was zombie pupz)
2. you'll want to rename it for the new project, make sure the file name and Contract Name are the same. 
3. from the CLI while you are in the base directory (stacked-pupz-contracts) for the new project type 'yarn run hardhat compile' 
4. once your initial compilation is finished, you'll see that there is a new abi directory generated. This is where you will find your contract abi's and artifacts. 
    a. abi is how web3 is able to detect the different functions that are callable in your contract 
    b. artifacts is how etherscan can 'verify' your contract. essentialy, when you deploy your contract the contract code and constructor arguments are converted to bytecode and when you push your contract for 'verification' it checks that the artifacts matches the bytecode on the EVM. 
5. now, the fun stuff. 

changing the contract 
