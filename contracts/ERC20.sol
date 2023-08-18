// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract ERC20 {
    string public name;
    string public symbol;
    uint256 public decimal;
    address public owner;
    uint256 public TotalSupply;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public approved;

    event Approval(address owner, address delegate, uint256 amount);
    event Transfer(address from, address to, uint256 amount);

    constructor(
        string memory nam,
        string memory sym,
        uint256 deci,
        uint256 TS
    ) {
        name = nam;
        symbol = sym;
        decimal = deci;
        owner = msg.sender;
        TotalSupply = TS;
        balances[msg.sender] = TotalSupply;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balances[msg.sender] >= amount, "Not enough tokkens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address delegate, uint256 amount) public returns (bool) {
        approved[msg.sender][delegate] = amount;
        emit Approval(msg.sender, delegate, amount);
        return true;
    }

    function transferFrom(address to, address from, uint256 amount) external {
        require(
            balances[from] >= amount,
            "The sending address donot have enough token"
        );
        require(approved[from][msg.sender] > 0, "The acount is not approved");
        require(
            approved[from][msg.sender] >= amount,
            "exceeded the amount of approved token"
        );
        balances[from] -= amount;
        approved[from][msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(from, to, amount);
    }
}
