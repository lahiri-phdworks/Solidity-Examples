// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Try these first.
contract Stack {
	uint256 c;
	
	constructor() public {
		c = 101992823834;
	}
	
	function setValue (uint256 temp) public {
		c = temp;
	}
	
    function findValue (uint256 a, uint256 b) public returns (uint256) {
    	if (a > 90) {
    		while (a > 0) {
    			c = a + b;
    			a = a - 1;
    		}
    	}
    	return c;
    }
}
