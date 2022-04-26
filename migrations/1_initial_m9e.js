const M9E = artifacts.require("M9E");

module.exports = function (deployer) {
  deployer.deploy(M9E, "https://ipfs.io/ipfs/QmQaWLSf3k2z3zKBZJ6CS5s5ud3VZ4FneW6xqxK3bGCTpW/");
};
