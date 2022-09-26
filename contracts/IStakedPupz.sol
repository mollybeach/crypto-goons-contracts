// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
// IStakedPupz interface
interface IStakedPupz is IERC20 {
    function mint(address account, uint256 amount) external;
}
