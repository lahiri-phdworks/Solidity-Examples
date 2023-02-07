contract bugfree
{
	mapping (address => uint) a;
    mapping (address => uint) b;


    event E1(uint num);

    function init(address u, uint v, uint w) public{

        a[u] = v;
        b[u] = w;

        if(block.timestamp>1)
        {
            emit E1(100);
        }
    }
   
    function f1(address u) public returns(uint){
        if (a[u]>10 && a[u]<16)
        {
            return f2(u) + a[u];
        } 
        else if (a[u]>90 && a[u]<99)
        {
            return f3(u) - a[u];
        }
        else
        {
            return 2*a[u];
        }
    }

     function f2(address u) public returns(uint){
        
        if (b[u] > 2*a[u])
        {
            return  2*(b[u]-a[u]);
        }
        else
        {
            return f3(u) * b[u];
        }

    }

    function f3(address u) public returns(uint){

        if(a[u]+b[u]<200)
        {
            if (a[u]%2 == 0)
            {
                if (b[u] % 2 == 0)
                {
                    return 5;
                }
                else
                {
                    return 10;
                }
            }
            else
            {
                if (b[u] % 2 == 0)
                {
                    return 2;
                }
                else
                {
                    return 16;
                }   
            }
        }
        else
        {
            return 0;
        }
    }
}