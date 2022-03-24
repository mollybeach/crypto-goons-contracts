const { expect } = require('chai');
//import way to deal with bigNumber
var chai = require('chai');
const BN = require('bn.js');
const { ethers } = require("hardhat"); 
chai.use(require('chai-bn')(BN));
const deployments = require('../data/deployments');

/*  write it test functions for these solidity functions:
        function startLotto() public onlyOwner returns (bool)
        function buyTickets(uint256 _qty, uint256 amount) public
        function draw() public onlyOwner returns(address)
        function endLotto() public onlyOwner returns(address)
        function withdrawTokens() 
*/
/*
describe('LotteryContract Unit Test', function () {
    let accounts, contractOwner, defaultErc20, lotteryContract, MAX_TICKETS = 999, QUANTITY = 1, AMOUNT = 60, PRICE = 5000000000000000000;
    before(async function () {
        accounts = await ethers.getSigners();
        contractOwner = accounts[0];
        let defaultErc20 = await ethers.getContractFactory('DefaultErc20', contractOwner);
        defaultErc20 = await defaultErc20.deploy();
        await defaultErc20.deployed();
        let LotteryContract = await ethers.getContractFactory('Lottery', contractOwner);
        lotteryContract = await LotteryContract.deploy(deployments.DefaultErc20);
        await lotteryContract.deployed();
    });

    beforeEach(async function () {
        let mint = await defaultErc20.connect(contractOwner).mint(contractOwner, ethers.utils.parseUnits("10000000000", 18));
        await mint.wait();
    });

    it('Lottery has not started ', async function () {
        expect((await lotteryContract.callStatic.checkNotStarted()).toString()).to.equal('false');
    });
    it('Price of entering lottery equals PRICE ', async function () {
        expect((await lotteryContract.callStatic.getPrice()).toString()).to.equal(PRICE.toString());
    });
    it('Maximum tickets equals MAX_TICKETS ', async function () {
        expect((await lotteryContract.callStatic.getMax()).toString()).to.equal(MAX_TICKETS.toString());
    });
    it('Lottery has started ', async function () {
        await lotteryContract.connect(contractOwner).startLotto();
    });
    it('Bought tickets in the lottery ', async function () {
        await lotteryContract.connect(contractOwner).buyTickets(QUANTITY, AMOUNT);
    });
    it('Draw from lottery', async function () {
        await lotteryContract.connect(contractOwner).draw();
    });
    it('End lottery', async function () {
        await lotteryContract.connect(contractOwner).endLotto();
    });
    it('Withdraw tokens', async function () {
        await lotteryContract.connect(contractOwner).withdrawTokens();
    });



});
*/
`
Issues :
ATTEMPT    :        -RUN THE BUY TICKET FUNCTION WITH THE CONTRACT AS IS-
        FAIL        ERROR   :  * Error: Big number problem with 18 digits.  * 
                    ATTEMPT :    -TEMPORARILY change from PRICE = 5000000000000000000; to PRICE = 50 and AMOUNT = 6000000000000000000 to AMOUNT = 60; to continue testing -
        FAIL        ERROR :     * Transaction reverted without a reason string *
                    ATTEMPT :   -COMMENT OUT LINES IN buyTicket function() TO FIND ERROR-
        PASS        line 1  :   require(LOTTO_LIVE);
        PASS        line 2  :   require(amount >= PRICE * _qty);
        PASS        line 3  :   require(_qty > 0);
        PASS        line 4  :   require(amount >= PRICE * _qty);
        PASS        line 5  :   require(TICKETBAG.length + _qty <= MAX_TICKETS);
        FAIL        line 6  :   require(IERC20(stackAddress).transferFrom(_msgSender(), address(this), PRICE * _qty));
                    ERROR   :   * Transaction reverted: function call to a non-contract account *
                    ATTEMPT :   -COMMENT OUT LINE 6 AND REMAINING LINES IN BUYTICKET FUNCTION() TO FIND ERROR-
        PASS        line 7  :   for (uint256 i = 0; i < _qty; i++) {
                                    TICKETBAG.push(msg.sender);
                                }
        PASS         line 8 :   emit JoinEvent (TICKETBAG.length, _qty);
        PASS         line 9 :  if(TICKETBAG.length == MAX_TICKETS) {
                                    endLotto();
                                }
                    ATTEMPT     -RUN THE DRAW LOTTERY TEST FUNCTION-
        FAIL        ERROR  :    * Error: VM Exception while processing transaction: reverted with panic code 0x12 (Division or modulo division by zero) *
                    ATTEMPT :   -COMMENT OUT LINES IN DRAW FUNCTION() TO FIND ERROR-
        PASS        line 1  :   require(TICKETBAG.length > 0);
        PASS        line 2  :   require(LOTTO_LIVE);
        FAIL        line 3  :   uint256 randomNum = uint256(block.timestamp) % uint256(TICKETBAG.length-1);
                    ERROR   :   VM Exception while processing transaction: reverted with panic code 0x12 (Division or modulo division by zero) *
                    ATTEMPT     -THE REMAINING LINES IN THIS FUNCTION ARE DEPENDENT ON THIS LINE- 
        FAIL        line 4  :   WINNER = TICKETBAG[randomNum];
        FAIL        line 5  :   emit DrawEvent(WINNER);
        FAIL        line 6  :   return WINNER;
ATTEMPT    :        -RUN THE END LOTTO() FUNCTION()-
        PASS        require(LOTTO_LIVE);
        PASS        WINNER = draw();
        PASS        LOTTO_LIVE = false;
        PASS        return WINNER;
        PASS        delete TICKETBAG;
ATTEMPT    :        -RUN THE WITHDRAW TOKEN TEST FUNCTION-
        FAIL        uint256 tokenSupply = stackAddress.balanceOf(address(this));
                    ERROR   :   * Transaction reverted: function call to a non-contract account *
                    ATTEMPT :  -THE REMAINING LINES IN THIS FUNCTION ARE DEPENDENT ON THIS LINE-  
        FAIL        stackAddress.transferFrom(address(this), msg.sender, tokenSupply);
    
`