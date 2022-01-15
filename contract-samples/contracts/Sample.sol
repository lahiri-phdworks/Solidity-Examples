// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2 <0.9.0;

contract Sample {
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
    
    // This gives the amount/ether strored in the smart contract.
    function sendContractEther(uint256 a, uint256 b, uint256 bal) public payable {
        uint256 c = a + b;
        (bool sent, bytes memory data) = payable(address(this))
                                    .call{value:1 ether}("");
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
    

}
