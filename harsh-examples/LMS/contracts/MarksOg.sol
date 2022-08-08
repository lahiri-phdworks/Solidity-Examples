pragma solidity >=0.4.2 <0.9.0;


import "./stringUtils.sol";

/* ORIGINAL NON BUGGY CONTRACT*/

contract MarksOg {
    
    using StringUtils for string;

    mapping (address => uint8[]) marks;
    mapping (address => string) grade;
    mapping (address => uint256) totalmarks;

    event MarksAdd(address addr, uint8[] mark, string g , uint256 avg);

    event Progress(string m);

    event encoding(bytes32 e);
    

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

    function graceMarks(address addr) public  returns (string memory message){

        string memory g = getGrade(addr);

 

        if (StringUtils.equal(g,"A*") || StringUtils.equal(g,"A") || StringUtils.equal(g,"B") || StringUtils.equal(g,"F")){

            
        }

        else
        {
            uint256 req = 0;
            if(StringUtils.equal(g,"C"))
            {
                req = 40;
   
            }
            else if (StringUtils.equal(g,"D"))
            {
                req = 35;
       
            }
            else if (StringUtils.equal(g,"E"))
            {
                req = 30;
            
            }
            else
            {
                req = 25;
              
            }

            checktot(addr,req*5);
  
        }


    }


    function checktot(address addr, uint256 req) public{
        if (req - totalmarks[addr]>15)
        {
            
        }

        else
        {
            uint256 avg = (req * 4)/10;
            grade[addr] = string(abi.encodePacked(compgrade(avg),'#'));
            //grade[addr] = compgrade(avg);
        }


    }    


 
    

}