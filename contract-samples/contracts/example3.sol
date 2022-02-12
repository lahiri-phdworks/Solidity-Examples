// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;
// Not so Smart Contract.

contract Example3 {
    uint256 counter = 0;
    address public owner;
    uint256 contractBalance = 0;
    // Basic Event Lgging
    event Log(address indexed sender, string message);
    event Looper(string message, uint256 number);
    
    
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    constructor() public {
        owner = msg.sender;
    }

    function depositOwner() public payable {
         (bool sent, bytes memory data) = payable(owner).call{value:msg.value}("");
         emit Log(msg.sender, "Deposit Ether to Owner");
         require(sent, "Failed to send Ether");
    }

    function depositContract() public payable {
        (bool sent, bytes memory data) = payable(address(this))
                                            .call{value:msg.value}("");
        emit Log(msg.sender, "Deposit Ether to Contract");     
        require(sent, "Failed to send Ether");
    }
    
    function testAdhoc(uint256 a, uint256 b) public pure returns (uint256) {
        return (a + b) * (a - b);
    }

    // This gives the amount/ether strored in the smart contract.
    function getContractBalance() public view returns (uint256 bal) {
        return address(this).balance;
    }

    // This gives the balance of the owner account.
    // Not the amount/ether strored in the smart contract.
    // The name is confusing here.
    function getOwnerBalance() public view returns (uint256 bal) {
        return owner.balance;
    }

    // Balance of the sender who called this function.
    function getBalanceSender() public view returns (uint256 bal) {
        return msg.sender.balance;
    }
    
    // web3.utils.toWei('1', 'ether') else goes to fallback since
    // arguments error.
    function transferEther(address payable addressToSend, uint256 amount)
        public
        payable
    {
        (bool sent, bytes memory data) = addressToSend
                           .call{value:amount}("");
        require(sent, "Failed to send Ether");
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
                // reverts if msg.value is lower than required 
                // ether here.
                // Ether is lost to contract here if extra 
                // ether sent >= amout to transfer.
                (bool sent, bytes memory data) = addressToSend
                                   .call{value:0.5 ether}("");
                emit Looper("Looping", count);
                require(sent, "Failed to send Ether");
                count = count - 1;
            }
        }
    }
}
