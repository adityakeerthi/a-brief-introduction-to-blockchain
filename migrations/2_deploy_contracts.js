var Token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
  deployer.deploy(Token, "EarthCoin", "ERC", 1000000000);
};
