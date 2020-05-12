pragma solidity >=0.4.21 <0.7.0;

contract EarthCoin {

//Variable declaration
  address owner;
  string name;
  string symbol;
  uint256 coinSupply;

  //track the balance holders of our token
  mapping(address => uint256) public balance;

  constructor(string memory _name, string memory _symbol, uint256 _coinSupply) public { //public means other contracts can call these data types
  //Creating our coin upon deployment
  owner = msg.sender;
  name = _name;
  symbol = _symbol;
  coinSupply = _coinSupply;

  //Initalize the supply to contract creator
  balance[owner] = coinSupply;
  }
  //Event Listener for transcations over this smart contract
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  /* These functions allow us to check supply, balances, and complete token transfers */
  function totalSupply() view public returns (uint256) {
    return coinSupply;
  }
  
  function getBalance(address _owner) view public returns (uint256) {
    return balance[_owner];
  }

  function transfer(address _to, uint256 _value) public returns (bool) {

    //This verifies the contract caller has appropiate Token funds
    require (balance[msg.sender] > _value);

    //Establishing transcation
    address _from = msg.sender;
    owner = _to;

    //calling our event emitter
    emit Transfer(_from, _to, _value);

    //Adjusting values
    balance[_from] = balance[_from] - _value;
    balance[_to] = balance[_to] + _value;
    return true;
  }
}
