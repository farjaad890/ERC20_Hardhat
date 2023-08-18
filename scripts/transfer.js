const hre = require("hardhat");
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const abiObject = require("../artifacts/contracts/ERC20.sol/ERC20.json");
const abi = abiObject.abi;
const provider = new hre.ethers.JsonRpcProvider();
const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const wallet = new hre.ethers.Wallet(privateKey, provider);
const ERC20 = new hre.ethers.Contract(contractAddress, abi, wallet);
async function Transfer() {
  const [owner, acount1, acount2] = await ethers.getSigners();
  const intialSenderBalance = await ERC20.balances(owner.address);
  const initalReceiverbalance = await ERC20.balances(acount1.address);
  console.log("initial Sender balance : ", intialSenderBalance);
  console.log("initial balance of the receiver ", initalReceiverbalance);
  await ERC20.transfer(acount1.address, 10);
  const updatedOwnerbalance = await ERC20.balances(owner.address);
  console.log("Balance of the sender after transaction: ", updatedOwnerbalance);
  const updatedAcountBalance = await ERC20.balances(acount1.address);
  console.log("Balance of receiver after transaction : ", updatedAcountBalance);
  ERC20.on("Transfer", function (senderaddress, receiveraddress, amount) {
    console.log(
      `${senderaddress} has send ${amount} tokens to ${receiveraddress}`
    );
    ERC20.off("Transfer");
  });
}
Transfer();
