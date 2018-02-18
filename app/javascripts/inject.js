import raw from "../../build/contracts/Placeth.json";
import Web3 from "web3";
import contract from "truffle-contract";

function injectWeb3() {
  return new Promise(resolve => {
    if (typeof web3 !== "undefined") {
      console.warn(
        "Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      // Use Mist/MetaMask's provider
      resolve({
        metamask: new Web3(web3.currentProvider),
        web3: new Web3(
          new Web3.providers.HttpProvider(
            "https://ropsten.infura.io/cglHTDR60SijNPajNpZZ"
          )
        )
      });
    } else {
      console.warn(
        "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      resolve({
        web3: new Web3(
          new Web3.providers.HttpProvider(
            "https://ropsten.infura.io/cglHTDR60SijNPajNpZZ"
          )
        )
      });
    }
  });
}

function injectContract(provider) {
  const Placeth = contract(raw);
  Placeth.setProvider(provider);

  return Promise.resolve(
    Placeth.at("0xbF6dcd87C7a0D585b23379BC4338235294AeF2F5")
  );
}

export { injectWeb3, injectContract };