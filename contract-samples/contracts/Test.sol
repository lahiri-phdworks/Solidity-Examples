// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;

contract Test {
    uint256 counter = 0;
    address public owner;
    uint256 contractBalance = 0;

    constructor() public {
        owner = msg.sender;
    }

    function depositOwner() public payable {
        payable(owner).transfer(msg.value);
    }

    function testAdhoc(uint256 a, uint256 b) public pure returns (uint256) {
        return (a + b) * (a - b);
    }

    // This gives the amount/ether strored in the smart contract.
    function getBalance() public view returns (uint256 bal) {
        return address(this).balance;
    }

    // This gives the balance of the owner account.
    // Not the amount/ether strored in the smart contract.
    // The name is confusing here.
    function getContractBalance() public view returns (uint256 bal) {
        return owner.balance;
    }

    // Balance of the sender who called this function.
    function getBalanceSender() public view returns (uint256 bal) {
        return msg.sender.balance;
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

    // web3.utils.toWei('1', 'ether') else goes to fallback since
    // arguments error.
    function transferEther(address payable addressToSend, uint256 amount)
        public
        payable
    {
        addressToSend.transfer(amount);
    }
}
