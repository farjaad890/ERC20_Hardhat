const hre = require("hardhat");

async function main() {
  const ERC20 = await ethers.getContractFactory("ERC20");
  const erc20 = await ERC20.deploy("YOYOHONEY", "YOHO", 18, 10000);
  await erc20.waitForDeployment();
  console.log("Address of contract ", erc20.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
