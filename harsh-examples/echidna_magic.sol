contract Time {
  uint start;
  uint marked;

  constructor() public {
    start  = block.timestamp;
    marked = block.timestamp;
  }

  function mark() public {
    marked = block.timestamp;
    assert(!(start == marked));
    assert(!(block.timestamp < start + 10 weeks));
  }

  function echidna_timepassed() public returns (bool) {
    return(start == marked);
  }

  function echidna_moretimepassed() public returns (bool) {
    return(block.timestamp < start + 10 weeks );
  }

}