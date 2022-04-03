// 0x4B8085a9E55ADc4b0b8D5EE93FE3621d2770C065
// We import Chai to use its asserting functions here.
const { expect } = require("chai");

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
  let mockProxyRegistry;
  let proxyContract;
  let lotteryContract;
  let lotteryOpen;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    mockProxyRegistry = await ethers.getContractFactory("MockProxyRegistry");
    proxyContract = await mockProxyRegistry.deploy();

    lottery = await ethers.getContractFactory("Lottery");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    lotteryContract = await lottery.deploy(
        proxyContract.address, 1943
    );
  });

  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    it("Should assign the total supply of tokens to the owner", async function () {
        await lotteryContract.mint(4);
        const ownerBalance = await lotteryContract.balanceOf(owner.address);
        expect(ownerBalance).to.equal(4);
    });

    it("Should open the lottery when owner balance is greater than zero", async function () {
      await lotteryContract.mint(1);
      expect(await lotteryContract.getLotteryOpen()).to.equal(true);
  });

it("Should close the lottery when owner balance is zero", async function () {
        await lotteryContract.mint(1);
    await lotteryContract.transferFrom(owner.address, addr1.address, 1);
   
 expect(await lotteryContract.getLotteryOpen()).to.equal(false);
});
  });


  /*describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {

    });

    it("Should fail if sender doesn’t possess NFT", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1.
      await hardhatToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await hardhatToken.transfer(addr2.address, 50);

      // Check balances.
      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });*/
});