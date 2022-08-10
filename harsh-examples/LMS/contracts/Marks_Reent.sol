pragma solidity >=0.4.2 <0.9.0;


import "./stringUtils.sol";

/* 


THIS CONTRACT CONTAINS REENTRANCY BUG. THE REENTRANT FUNCTIONS ARE graceMarks() and checktot().

*/

contract Marks_Reent {
    
    using StringUtils for string;

    mapping (address => uint8[]) marks;
    mapping (address => string) grade;
    mapping (address => uint256) totalmarks;
    mapping(address => bool) UpdateStatus;
    mapping(address => uint8) count; //only for echidna
    event MarksAdd(address addr, uint8[] mark, string g , uint256 avg);
    event path (address student, string funcname);
    

    function insert(address addr, uint8[] memory m ) public returns(bool)
    {
            marks[addr] = m;

            uint256 tot = 0;
            uint8 flag = 0;
            uint256 avg ;
            for (uint8 i = 0 ;i<5;i++)
            {
                    tot+= m[i];

                    if (flag == 0 && m[i]>46){

                        flag = 1;
                    }

                    if ((flag==0 || flag == 1) && m[i]<20){
                        flag = 2;

                    }
            }

            avg = (tot * 4)/10;

            totalmarks[addr] = tot;

            if (flag== 1 && avg>=85){
                grade[addr] = 'A*';
            }
            else if (flag==2 && avg<50)
            {
                grade[addr] = 'F';
            }
            else
            {
                grade[addr] = compgrade(avg);
            }

            UpdateStatus[addr] = false;
            count[addr] = 1 ; //only for echidna
            emit MarksAdd(addr,marks[addr],grade[addr],avg);
            return true;
    }

    function compgrade(uint256 avg) public returns(string memory)
    {
        if (avg>=90) return 'A';
        if (avg>=80) return 'B';
        if (avg>=70) return 'C';
        if (avg>=60) return 'D';
        if (avg>=50) return 'E';
        if (avg>=45) return 'Incomplete';
    }

    function getIndMark(address addr, uint8 idx) public view returns(uint8){

         return marks[addr][idx];
    }    

    function getGrade(address addr) public view returns(string memory){

         return grade[addr];
    }

    function getStatus(address addr) public view returns(bool){

         return UpdateStatus[addr];
    }

    function graceMarks(address addr) public{

        if (UpdateStatus[addr] == false){
            
            
            string memory g = getGrade(addr);
            
            if (StringUtils.equal(g,"A*") || StringUtils.equal(g,"A") || StringUtils.equal(g,"B") || StringUtils.equal(g,"F")){

                


                }

            else
            {
                if(StringUtils.equal(g,"C") || StringUtils.equal(g,"D") || StringUtils.equal(g,"E"))
                {
                    emit path(addr,'Calling checktot');
                    checktot(addr);

                }
             

            }

        
        UpdateStatus[addr] = true;    

        }
        
    }




    function checktot(address addr) public returns(string memory message ){
        
            bool[4] memory flags = [true,true,true,true];                             //Flag Array for triggering the bug
            uint8[] memory m = marks[addr];                                           
                                                   
            for (uint8 i = 0 ;i<5;i++) 
            {
                if (flags[0] &&  10<=m[i] && m[i]<20) flags[0] = false;                 //Condition testing to trigger bug
                else if (flags[1] &&  20<=m[i] && m[i]<30) flags[1] = false;            //Condition testing to trigger bug
                else if (flags[2] &&  30<=m[i] && m[i]<40) flags[2] = false;            //Condition testing to trigger bug
                else if (flags[3] &&  40<=m[i] && m[i]<50) flags[3] = false;            //Condition testing to trigger bug
             
                
            }

            totalmarks[addr] = totalmarks[addr]+10;
             
            if(!(flags[0]||flags[1]||flags[2]||flags[3]))
            {
                if (totalmarks[addr]<225)
                {
                    emit path(addr,'Calling graceMarks');
                    count[addr]+=1;
                    graceMarks(addr);
                }
                else
                {
                    uint256 avg = (totalmarks[addr] * 4)/10;

                }
            }                                                                      
            
           

   
            uint256 avg = (totalmarks[addr] * 4)/10;
            string  memory newg = compgrade(avg);
           
            grade[addr] = string(abi.encodePacked(newg,'#'));
            assert(count[addr]<2); // Only for testing in echidna
            
            //grade[addr] = compgrade(avg);


        }   

}