// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;

contract Example1 {
    uint256 a;
    address Owner;

    constructor(address Addr, uint256 num) public {
        Owner = Addr;
        a = num;
    }

    function findValue (uint256 x, uint256 y) public returns (uint256) {
    	if (x > 90) {
    		while (a > 0) {
    			c = a + b;
    			a = a - 1;
    		}
    	}
    	return c;
    }
}
