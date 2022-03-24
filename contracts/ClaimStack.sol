// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StackClaim is Ownable {
    address stackAddress;

    mapping (address=>uint256) pendingWithdrawal;

    function setPendingWithdrawals(address[] calldata _accounts, uint256[] calldata _amount) public onlyOwner() { 
        require(_accounts.length == _amount.length, "array length mismatch");
        for (uint i; i< _accounts.length; i++) {
            pendingWithdrawal[_accounts[i]] = _amount[i];
        }
    }

    function claim() public {
        uint256 amount = pendingWithdrawal[msg.sender];

        pendingWithdrawal[msg.sender] = 0;
        IERC20(stackAddress).transfer(msg.sender, amount);
    }
}