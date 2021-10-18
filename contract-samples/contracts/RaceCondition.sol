// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// https://github.com/ethereum/EIPs/issues/20
abstract contract ERC20 {
    // function totalSupply() private view returns (uint256 totalSupply);

    // function balanceOf(address _owner) view returns (uint256 balance);

    // function transfer(address _to, uint256 _value) returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public virtual returns (bool success) {
        return success;
    }

    // function approve(address _spender, uint256 _value) returns (bool success);

    // function allowance(address _owner, address _spender)
    //     view
    //     returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}

contract RaceCondition {
    address private owner;
    uint256 public price;
    ERC20 token;

    constructor(uint256 _price, ERC20 _token) {
        owner = msg.sender;
        price = _price;
        token = _token;
    }

    // If the owner sees someone calls buy
    // he can call changePrice to set a new price
    // If his transaction is mined first, he can
    // receive more tokens than excepted by the new buyer
    function buy(uint256 new_price) public payable {
        require(msg.value >= price);
        // we assume that the RaceCondition contract
        // has enough allowance
        token.transferFrom(msg.sender, owner, price);
        price = new_price;
        owner = msg.sender;
    }

    function changePrice(uint256 new_price) public {
        require(msg.sender == owner);
        price = new_price;
    }
}
