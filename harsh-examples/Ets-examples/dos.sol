contract blockdepen
{
	mapping (address => int) a;
    mapping (address => int) b;
    mapping (address => int) s;

    event E1(int num);

    function init(address u, int v, int w) public{

        a[u] = v;
        b[u] = w;
        s[u] = 0;// init ets state
        if (v-w < 20 || w-v>20)
        {
            s[u] = 1; // first transition
        }
    }
   
    function f1(address u) public returns(int){
        if (a[u]>10 && a[u]<16)
        {
            if (s[u]==1 && a[u]>11 && a[u]<15)
            {
                s[u] = 2; // second transition
            }
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

     function f2(address u) public returns(int){
        
        if (b[u] > 2*a[u])
        {
            return  2*(b[u]-a[u]);
        }
        else
        {
            if(s[u] == 2 && (b[u] > -2 && b[u]<16))
            {
                s[u] = 3; // third transition
            }
            return f3(u) * b[u];
        }

    }

    function f3(address u) public returns(int){

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
                    // uint bt = block.number;
                    if (s[u] == 3)
                    {
                        if (block.number%5==2) // buggy line
                        {
                            assert(false);
                        }
                    }
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