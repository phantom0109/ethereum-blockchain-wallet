pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NiceToken is ERC20 {
    constructor() ERC20("Nice Coin", "NICE") {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

}
