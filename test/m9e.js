const m9e = artifacts.require("m9e");
const truffleAssert = require('truffle-assertions');
require('dotenv').config();
const Account = require('eth-lib/lib/account');
const ethereumjsUtil = require('ethereumjs-util');
const BN = require('bn.js');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("m9e", function (accounts) {
  console.log(accounts);
  let m9eContract;
  beforeEach('should setup the contract interface', async() => {
    m9eContract = await m9e.deployed();
  });

  describe('Contract Name and Symbol check', function(){
    it("should return M9E as contract name", async function (){
      const name = await m9eContract.name();
      assert.equal(name, 'M9E');
    });

    it("should return M9ENFT as contract symbol", async function (){
      const symbol = await m9eContract.symbol();
      assert.equal(symbol, 'M9ENFT');
    });
  });

  describe('Contract Owner check', function(){
    it("should return owner address as first account address", async function(){
      const owner = await m9eContract.owner();
      assert.equal(owner, accounts[0]);
    })
  })

  describe('setPause function check', function(){
    it("should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.setPause(false, {'from': accounts[1]}));
    })

    it("should return pause event", async function () {
      const result = await m9eContract.setPause(false, {'from': accounts[0]});
      truffleAssert.eventEmitted(result, 'PauseEvent', (event) => {
        return event.pause == false;
      });
    });
  });

  describe('setPrice function check', function(){
    it("should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.setPrice(web3.utils.toWei('0.19', 'ether'), {'from': accounts[1]}));
    })

    it("should return newPrice event", async function () {
      const result = await m9eContract.setPrice(web3.utils.toWei('0.19', 'ether'), {'from': accounts[0]});
      truffleAssert.eventEmitted(result, 'NewPriceEvent', (event) => {
        return event.price == web3.utils.toWei('0.19', 'ether');
      });
    });
  });

  describe('setMaxElement function check', function(){
    it("should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.setMaxElement(999, {'from': accounts[1]}));
    })

    it("should return NewMaxElement event", async function () {
      const result = await m9eContract.setMaxElement(999 * 2, {'from': accounts[0]});
      truffleAssert.eventEmitted(result, 'NewMaxElement', (event) => {
        return event.max == 999 * 2;
      });
    });
  });

  describe('mint function check', function(){
    // Test mint datas
    const tokenAmount = 3;
    const timestamp = parseInt(new Date().getTime() / 1000);
    const minterAddress = accounts[1];
    
    it("should mint with correct signature", async function () {
      const price = await m9eContract.price(tokenAmount);
      
      // Data Pack
      const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [minterAddress, tokenAmount, timestamp]
      );
      
      // Signature Generate
      const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
      const messageBytes = web3.utils.hexToBytes(messageHex);
      const messageBuffer = Buffer.from(messageBytes);
      const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
      const signature = Account.sign(hash, process.env.PRIVATE_KEY);

      await m9eContract.mint(tokenAmount, timestamp, signature, { 'from': minterAddress, 'value': price });
      const bnTokens = await m9eContract.walletOfOwner(accounts[1]);
      var tokens = [];
      bnTokens.forEach(bn => tokens.push(bn.toNumber()));
      console.log('Tokens:', tokens);

      assert.deepEqual(tokens.length, tokenAmount);
    });

    it("should fail with incorrect signature", async function () {
      const price = await m9eContract.price(1);

      // Fake Signature
      const signature = web3.utils.utf8ToHex('fakesignature');
      await truffleAssert.reverts(m9eContract.mint(tokenAmount, timestamp, signature, { 'from': minterAddress, 'value': price }));
    });

    it("should fail with previous timestamp", async function () {
      const price = await m9eContract.price(1);
      
      // Data Pack
      const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [minterAddress, tokenAmount, timestamp - 31]
      );
      
      // Signature Generate
      const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
      const messageBytes = web3.utils.hexToBytes(messageHex);
      const messageBuffer = Buffer.from(messageBytes);
      const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
      const signature = Account.sign(hash, process.env.PRIVATE_KEY);

      await truffleAssert.reverts(m9eContract.mint(tokenAmount, timestamp - 31, signature, { 'from': minterAddress, 'value': price }));
    })
  });

  describe('withdraw function check', function(){
    const royalAddresses = ['0xD8c844d326316358BD156b88D61F7C7dECF3446b', '0x348EA0F28b3FfA185b00415d78FFe7FC2BFFa794'];
    const valuePercentages = [80, 20];

    it("should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.withdrawFor(royalAddresses, valuePercentages, {'from': accounts[1]}));
    });

    it("should withdraw ethers to royalty addresses", async function () { 
      await m9eContract.withdrawFor(royalAddresses, valuePercentages, {'from': accounts[0]});
    });
  });

  // describe('getUnsoldTokens function check', function(){
  //   const minted = [10];

  //   it("should get unsold token ids", async function () {
  //     const tokenBNs = await m9eContract.getUnsoldTokens(1, 999 * 2);
  //     var unsoldTokens = [];
  //     tokenBNs.forEach(bn => unsoldTokens.push(bn.toNumber()));
  //     unsoldTokens = unsoldTokens.filter(token => token != 0);
      
  //     minted.forEach(mintedToken => {
  //       assert.equal(unsoldTokens.filter(unsoldToken => unsoldToken == mintedToken).length, 0);
  //     });

  //     assert.equal(unsoldTokens.length, 999 * 2 - minted.length);
  //   })
  // });

  // describe('mintUnsoldTokens function check', function(){
  //   const wantedTokens = [20, 30];
    
  //   it("should fail with non-owner account", async function () {
  //     await truffleAssert.reverts(m9eContract.mintUnsoldTokens(wantedTokens, {'from': accounts[1]}));
  //   });

  //   it("should fail when Pause is false", async function () {
  //     await m9eContract.setPause(false, {'from': accounts[0]});
  //     await truffleAssert.reverts(m9eContract.mintUnsoldTokens(wantedTokens, {'from': accounts[0]}));
  //   })

  //   it("should mint 2 tokens for owner account", async function () {
  //     await m9eContract.setPause(true, {'from': accounts[0]});
  //     await m9eContract.mintUnsoldTokens(wantedTokens, {'from': accounts[0]});
  //     const ownerBNTokens = await m9eContract.walletOfOwner(accounts[0]);
  //     var ownerTokens = [];
  //     ownerBNTokens.forEach(bn => ownerTokens.push(bn.toNumber()));

  //     assert.deepEqual(ownerTokens, wantedTokens);
  //   });
  // });

  describe('Metadata Hide / Reveal check', function(){
    const sampleURI = "https://ipfs.io/ipfs/QmQaWLSf3k2z3zKBZJ6CS5s5ud3VZ4FneW6xqxK3bGCTpW/sample";
    
    it("setSampleURI should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.setSampleURI(sampleURI, {'from': accounts[1]}));
    })
    
    it("should set sample token URI", async function () {
      await m9eContract.setSampleURI(sampleURI, {'from': accounts[0]});
    });

    it("setMetaReveal should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.setMetaReveal(false, 1, 999, {'from': accounts[1]}));
    });

    it("setMetaReveal for hide should work correctly to return sample metadata", async function(){
      await m9eContract.setMetaReveal(false, 1, 999, {'from': accounts[0]});
      const testTokenURI = await m9eContract.tokenURI(3);
      assert.equal(testTokenURI, sampleURI);
    });

    it("setMetaReveal for reveal should work correctly to return correct metadata", async function(){
      await m9eContract.setMetaReveal(true, 0, 0, {'from': accounts[0]});
      const testTokenURI = await m9eContract.tokenURI(3);
      assert.equal(testTokenURI, "https://ipfs.io/ipfs/QmQaWLSf3k2z3zKBZJ6CS5s5ud3VZ4FneW6xqxK3bGCTpW/3");
    })
  });

  describe('giftMint admin func check', function() {
    const royalAddresses = ['0xD8c844d326316358BD156b88D61F7C7dECF3446b', '0x348EA0F28b3FfA185b00415d78FFe7FC2BFFa794'];
    const tokenAmounts = [5, 4];

    it("should fail with non-owner account", async function () {
      await truffleAssert.reverts(m9eContract.giftMint(royalAddresses, tokenAmounts, {'from': accounts[1]}));
    });

    it("should mint gift tokens correctly", async function () {
      await m9eContract.giftMint(royalAddresses, tokenAmounts, {'from': accounts[0]});
      for(let i = 0; i < royalAddresses.length; i ++){
        let bnTokens = await m9eContract.walletOfOwner(royalAddresses[i]);
        let tokens = [];
        bnTokens.forEach(bn => tokens.push(bn.toNumber()));
        console.log(royalAddresses[i], tokens);
        assert.equal(tokens.length, tokenAmounts[i]);
      }
    });
  })
});
