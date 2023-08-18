const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const chaiAsPromised = require("chai-as-promised");

describe("ERC20", async function () {
  async function deploymentForeveryTestcase() {
    const [owner, acount1, acount2] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy("YOYOHONEY", "YOHO", 18, 10000);

    return { erc20, owner, acount1, acount2 };
  }
  describe("Deployment", async function () {
    it("Then owner of the contract should be set correctly", async function () {
      const { owner, erc20 } = await loadFixture(deploymentForeveryTestcase);
      expect(await erc20.owner()).to.equal(owner.address);
    });
    it("It Should set the correct name", async function () {
      const { owner, erc20 } = await loadFixture(deploymentForeveryTestcase);
      expect(await erc20.name()).to.equal("YOYOHONEY");
    });
    it("It should set the correct symbol", async function () {
      const { owner, erc20 } = await loadFixture(deploymentForeveryTestcase);

      expect(await erc20.symbol()).to.equal("YOHO");
    });
    it("It should set the correct total supply", async function () {
      const { owner, erc20 } = await loadFixture(deploymentForeveryTestcase);

      expect(await erc20.TotalSupply()).to.equal(10000);
    });
    it("It should set the correct decimal places for the token", async function () {
      const { owner, erc20 } = await loadFixture(deploymentForeveryTestcase);

      expect(await erc20.decimal()).to.equal(18);
    });
    it("It should set the total supply to the owner balance", async function () {
      const { owner, erc20 } = await loadFixture(deploymentForeveryTestcase);

      expect(await erc20.balances(owner)).to.equal(10000);
    });
  });

  describe("Transfer", async function () {
    it("should transfer the amount from sender to receiver and update it balances accordingly", async function () {
      const { owner, erc20, acount1, acount2 } = await loadFixture(
        deploymentForeveryTestcase
      );
      const initalOwnerbalance = await erc20.balances(owner.address);
      const initialAddressbalance = await erc20.balances(acount1.address);
      //console.log("The initial token balance of owner ", initalOwnerbalance);
      // console.log(
      //   "The initial token balance of acount ",
      //   initialAddressbalance
      // );
      await erc20.transfer(acount1.address, 100);
      const balanceofOwner = await erc20.balances(owner.address);
      //console.log("The balance of owner", balanceofOwner);
      const balanceofAccount1 = await erc20.balances(acount1.address);
      //console.log("The balance of acount1", balanceofAccount1);
      expect(balanceofOwner).to.equal(initalOwnerbalance - BigInt(100));
      expect(balanceofAccount1).to.equal(initialAddressbalance + BigInt(100));
    });
    it("Should fail because of insufficient balance", async function () {
      const { owner, erc20, acount1, acount2 } = await loadFixture(
        deploymentForeveryTestcase
      );
      const initialBalanceacount1 = await erc20.balances(acount1.address);
      const initialBalanceacount2 = await erc20.balances(acount2.address);
      //console.log("Initial balance of acount 1 ", initialBalanceacount1);
      //console.log("Initial balance of acount 2 ", initialBalanceacount2);
      await expect(
        erc20.connect(acount1).transfer(acount2.address, 100)
      ).to.be.revertedWith("Not enough tokkens");
      expect(initialBalanceacount1).to.equal(
        await erc20.balances(acount1.address)
      );
      expect(initialBalanceacount2).to.equal(
        await erc20.balances(acount2.address)
      );
    });
  });
  describe("Approved", async function () {
    it("Should pass, The approved acount1 sends token to acount2 from the owner acount", async function () {
      const { owner, erc20, acount1, acount2 } = await loadFixture(
        deploymentForeveryTestcase
      );
      const initalOwnerbalance = await erc20.balances(owner.address);
      //console.log("The initial balance of owner", initalOwnerbalance);
      const initialBalanceacount2 = await erc20.balances(acount2.address);
      //console.log("Initial balance of acount 2 ", initialBalanceacount2);
      await erc20.approve(acount1.address, 50);
      //console.log("Approved acount1 to transfer token");
      const approval = await erc20.approved(owner.address, acount1.address);
      //console.log("The aproved amount that owner has allowed to ", approval);
      //console.log("The amount to be send ", 20);
      await erc20
        .connect(acount1)
        .transferFrom(acount2.address, owner.address, 20);
      const updatedOwnerbalance = await erc20.balances(owner.address);
      //console.log("The updated owner balance ", updatedOwnerbalance);
      const updatedAcountBalance = await erc20.balances(acount2.address);
      //console.log("Updated balance of receiver acount ", updatedAcountBalance);
      expect(updatedOwnerbalance).to.equal(initalOwnerbalance - BigInt(20));
      expect(updatedAcountBalance).to.equal(initialBalanceacount2 + BigInt(20));
    });
    it("Should fail because the caller is not approved ", async function () {
      const { owner, erc20, acount1, acount2 } = await loadFixture(
        deploymentForeveryTestcase
      );
      await expect(
        erc20.connect(acount1).transferFrom(acount2.address, owner.address, 20)
      ).to.be.revertedWith("The acount is not approved");
    });
    it("Should fail because the amount has exceeded the allowance", async function () {
      const { owner, erc20, acount1, acount2 } = await loadFixture(
        deploymentForeveryTestcase
      );
      await erc20.approve(acount1.address, 50);
      await expect(
        erc20.connect(acount1).transferFrom(acount2.address, owner.address, 100)
      ).to.be.revertedWith("exceeded the amount of approved token");
    });
  });
});
