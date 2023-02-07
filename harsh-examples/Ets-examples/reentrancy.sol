contract reentrancy {
    mapping (address => uint) userBalance;
    mapping(address => uint) state; // Extra

    event E1(address victim, uint bal);
    event E2(string mess);
    event E3 (uint s);
   
    function getBalance(address u) public returns(uint){
        emit E1(u,userBalance[u]); 
        return userBalance[u];
    }

     function addToBalance(uint amt) public{
        userBalance[msg.sender] += amt;
        if(10<=amt && amt<=30)
        {
            state[msg.sender] = 10;
        }
    }

     function getstate(address u) public returns(uint){   // Just to check state values
        return state[u];
    }   

     function withdrawBalance(uint amt) public{
        emit E3(state[msg.sender]);
        if(userBalance[msg.sender]/10 <= amt && amt<= userBalance[msg.sender]/5 && state[msg.sender]==10) // Guard
        {
            emit E2('state 11');
            state[msg.sender] = 11; //Ets  state change
        }
        emit E3(state[msg.sender]);
        emit E3(address(this).balance);
        if(userBalance[msg.sender]>=amt){
            
            if(state[msg.sender]==11) // Guard Condition
            {
                state[msg.sender] = 10;  // State change
                emit E2('buggy');
                msg.sender.call{value:amt}(""); // Bug line

            }
            address payable to = payable(msg.sender);
            to.transfer(amt);
            userBalance[msg.sender] -= amt;
   
            emit E2('end');
        
        }   
    }

}