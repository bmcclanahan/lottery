// 0x4B8085a9E55ADc4b0b8D5EE93FE3621d2770C065
// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("NFT contract", function () {
  // Mocha has four functions that let you hook into the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let lottery;
  let mockWETH;
  let mockProxyRegistry;
  let mockVFRCoordinator;
  let lotteryContract;
  let proxyContract;
  let vrfCoordinatorContract;
  let WETH;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let amount = 100;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    mockWETH = await ethers.getContractFactory("MockWETH");
    WETH = await mockWETH.deploy(owner.address, amount);

    mockProxyRegistry = await ethers.getContractFactory("MockProxyRegistry");
    proxyContract = await mockProxyRegistry.deploy();

    mockVFRCoordinator = await ethers.getContractFactory("MockVRFCoordinator");
    vrfCoordinatorContract = await mockVFRCoordinator.deploy();

    lottery = await ethers.getContractFactory("Lottery");  
    lotteryContract = await lottery.deploy(
        proxyContract.address, vrfCoordinatorContract.address, WETH.address, 1943
    );
  });

  describe("Transactions", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    it("Should assign the total supply of tokens to the owner", async function () {
        await lotteryContract.mint(4);
        const ownerBalance = await lotteryContract.balanceOf(owner.address);
        expect(ownerBalance).to.equal(4);
    });

    it("Should open the lottery when owner balance is greater than zero", async function () {
      expect(await lotteryContract.getLotteryOpen()).to.equal(false);
      await lotteryContract.mint(1);
      expect(await lotteryContract.getLotteryOpen()).to.equal(true);
    });

    it("Should close the lottery when owner balance is zero", async function () {
      expect(await lotteryContract.getLotteryOpen()).to.equal(false);
      await lotteryContract.mint(1);
      expect(await lotteryContract.getLotteryOpen()).to.equal(true);
      await lotteryContract.transferFrom(owner.address, addr1.address, 1);
      expect(await lotteryContract.getLotteryOpen()).to.equal(false);
    });
    
    it("Should call request random words when all NFTs sold", async function () {
      expect(await vrfCoordinatorContract.requestRandomWordsCalled()).to.equal(false);
      await lotteryContract.mint(2);
      await lotteryContract.transferFrom(owner.address, addr1.address, 1);
      await lotteryContract.transferFrom(owner.address, addr1.address, 2);
      expect(await vrfCoordinatorContract.requestRandomWordsCalled()).to.equal(true);
    });
    
  });
  describe("Pay Out", function(){

    it("should have a WETH balance of 100", async function () {
      expect(await lotteryContract.wethBalance()).to.equal(amount);
    })
    
  })

  describe("getWinner", function(){
    it("should return 2 if lottery is closed ", async function () {
      await lotteryContract.mint(3);
      for(let i=1; i<4; i++){
        await lotteryContract.transferFrom(owner.address, addr1.address, i);
      }
      expect(await lotteryContract.getWinner()).to.equal(2);
    })

    it("should revert if lottery is open ", async function () {
    })

  })

  
});