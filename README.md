# ERC20 token Hardhat deployment Project

This project demonstrates a basic Hardhat use case. It comes with a ERC20 smart contract,test cases for that contract, and a script that deploys that contract,and a script that transfers a token from one address to another and listens to the event emitted by the smart contract.

By Default Hardhat gives us 20 wallets with 100 dummy ethers with their private key for tecting purposes.

**_Keep in mind the private keys of these wallets are exposed so do not use these for mainnet transactions_**

#Technologies used
1.npm
2.Hardhat
3.chai
4.ethers.js
5.Solidity

##Setting up the project:

**1.Clone the repository from :**

```
https://github.com/farjaad890/ERC20_Hardhat.git
```

**2.Installing dependencies**

```shell
npm install
```

In this project we have demonstrated how to write a smart contract, how to debug a smart contract and used chai package to run test cases on the smart contract.

Once the project has been set up you can run script or run the test cases.

##To compile the contract:

```shell
npx hardhat compile
```

This command compiles the contract in your project.**Run this command every time some changes are made to the contract.**

##Functions in the smart contract:

1.name
2.symbol
3.decimal
4.owner
5.TotalSupply
6.balances
7.transfer
8.approve
9.transferFrom

##To run test cases

In the root folder run commands:

```shell
npx hardhat test
```

**Test cases :**
1.Deployment

\*set the correct owner address.

\*set the correct name.

\*set the correct symbol.

\*set the correct Total supply.

\*set the correct decimals.

2.Transfer

\*Transfer from one acount to a second acount.

\*Sender donot have enough tokes to send and tries to send token.

3.Approval

\*An aproved acount sends token from one acount to another.

\*An unaproved acount tries to send token to another acount.

3.Event listening

\*Listens to the Transfer event when transfer function is called.

\*Listens to the approve event when an account is aproved .

##To run node

```shell
npx hardhat node
```

This command runs a node on a local network which is in memory which is destroyed as the project is closed.

##To run scripts on the node

Availabe scripts: **deply.js**, **transfer.js**
While the node is running run command:

```shell
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/transfer.js --network localhost
```

**These commands run the scripts on http://127.0.0.1:8545/ which is the local host on which the node is running.**
