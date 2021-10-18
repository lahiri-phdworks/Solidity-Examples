// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Address {
    function getBytes32ArrayForInput() pure public returns (bytes32[10] memory b32Arr) {
        b32Arr = [bytes32("Sumit"), bytes32("Ravi"), bytes32("Rajan"), bytes32("Raghu"), bytes32("EtherKing"), 
        bytes32("Shekhar"), bytes32("Contractor"), bytes32("Pulubk"), bytes32("BitcoinKing"), bytes32("DaoHecker")];
    }
}
