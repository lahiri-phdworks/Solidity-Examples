// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;

contract Example1 {
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

}
