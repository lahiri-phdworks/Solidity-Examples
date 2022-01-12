// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;
import "hardhat/console.sol";

contract Sample {
    uint256 counter = 0;

    constructor() public payable {}

    function returnOne() public pure returns (uint256) {
        return 1;
    }

    function rectangle(uint256 w, uint256 h)
        public
        pure
        returns (uint256 s, uint256 p)
    {
        s = w * h;
        p = 2 * (w + h);
    }

    function getBalance() public view returns (uint256 bal) {
        return address(this).balance;
    }

    function getBalanceOwn() public view returns (uint256 bal) {
        return msg.sender.balance;
    }

    function addNums1(uint256 a, uint256 b)
        public
        pure
        returns (uint256 addResult)
    {
        addResult = a * (b + 42);
    }

    function transferToAddressStub(
        uint256 a,
        uint256 b,
        address payable addressToSend
    ) public payable {
        // require(msg.value >= 1 ether, "More than 1 ether needed");
        uint256 count = b;
        if (counter != a) {
            // count may go negative : revert.
            while (count != 0) {
                // reverts if msg.value is lower than 1 ether here.
                // Ether is lost.
                addressToSend.transfer(1 ether);
                count = count - 1;
            }
        }
    }

    function transferToaddress(address payable addressToSend, uint256 amount)
        public
        payable
    {
        addressToSend.transfer(amount);
    }

    function transferEther(address payable addressToSend) public {
        addressToSend.transfer(1 ether);
    }
}
