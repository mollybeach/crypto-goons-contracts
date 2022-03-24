// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract DefaultErc20 is ERC20Burnable {
    event Mint(address addressFrom, address addressTo, uint256 amount);

    address public contractAddress;

    constructor() ERC20("TokenName", "TokenSymbol") {
        contractAddress = address(this);
    }

    function mint(address destinationAddress, uint256 amount) public {
        _mint(destinationAddress, amount);
        emit Mint(msg.sender, destinationAddress, amount);
    }
}