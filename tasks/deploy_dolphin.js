const fs = require('fs');
const { start } = require('repl');
const deployments = require('../data/deployments');

task('deploy-doodle-ape').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  const name = "DolphinClub";
  const symbol = "DOODLEAPE";
  const baseUri = "ipfs://QmUEtxHTg33EJu5LzmnFa5YJ6MXC3A6GKFWZRUYYs3d9Tb/";

  const factory = await ethers.getContractFactory("DolphinClub", deployer);
  const instance = await factory.deploy(
      name,
      symbol,
      baseUri
  );
  await instance.deployed();

  console.log(`Deployed contract DolphinClub to: ${instance.address}`);
  deployments.dolphinClub = instance.address;

  const json = JSON.stringify(deployments, null, 2);
    fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
      flag: 'w',
  });
});

task('deploy-dummies').setAction(async function () {
    const [deployer] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("DefaultErc721", deployer);
    let instance = await factory.deploy();
    await instance.deployed();

    console.log(`Deployed contract defaultErc721Test to: ${instance.address}`);
    deployments.defaultErc721Test = instance.address;
  
    let json = JSON.stringify(deployments, null, 2);
      fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
        flag: 'w',
    });

    let erc20 = await ethers.getContractFactory("DefaultErc20", deployer);
    let erc20instance = await erc20.deploy();
    await erc20instance.deployed();

    console.log(`Deployed contract defaultErc20Test to: ${instance.address}`);
    deployments.defaultErc20Test = erc20instance.address;
  
    let json2 = JSON.stringify(deployments, null, 2);
      fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json2}\n`, {
        flag: 'w',
    });
})

task('load-up').setAction(async function () {
    const [sender] = await ethers.getSigners();

    const erc721 = await ethers.getContractAt("DefaultErc721", deployments.defaultErc721Test);
    const erc20 = await ethers.getContractAt("DefaultErc20", deployments.defaultErc20Test);
    const doodleApe = await ethers.getContractAt("DolphinClub", deployments.dolphinClub);

    // for (i = 0; i < 840; i ++) {
    //     const mint = await erc721.connect(sender).awardItem(sender.address, "ipfs");
    //     await mint.wait();
    // }

    // let amount = ethers.utils.parseUnits("1000000000000000000000000000000000000000000000000000", 18);

    // const erc20Mint = await erc20.connect(sender).mint(sender.address, amount);
    // await erc20Mint.wait();

    // const approve = await erc20.connect(sender).approve(deployments.dolphinClub, amount);
    // await approve.wait();

    // const setContracts = await doodleApe.connect(sender).setContracts(deployments.defaultErc721Test, deployments.defaultErc721Test, deployments.defaultErc20Test);
    // await setContracts.wait();

    // const startPresale = await doodleApe.connect(sender).setPresale(true);
    // await startPresale.wait();

    // for (i=1; i<421; i++) {
    //     const baycClaim = await doodleApe.connect(sender).baycClaim(i);
    //     await baycClaim.wait();
    // }

    // for (i=420; i<841; i++) {
    //     const doodleClaim = await doodleApe.connect(sender).doodleClaim(i);
    //     await doodleClaim.wait();
    // }

    const gmClaim = await doodleApe.connect(sender).gmClaim();
    await gmClaim.wait();

    const tokensOfOwner = await doodleApe.callStatic.tokensOfOwner(sender.address);
    console.log(tokensOfOwner.toString());

    const setStart = await doodleApe.connect(sender).setStart(true);
    await setStart.wait();

    const mintPublic = await doodleApe.connect(sender).mint(5);
})