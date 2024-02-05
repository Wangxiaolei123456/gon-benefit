import store from "../store/index.js"
import { getIirsAccoutInfo } from "./iris/wallet";
   
   async function addIRISNetwork() { 
    if (!window.getOfflineSigner || ! window.keplr) {
        console.log('Please install keplr extension');
    } else {
        if (window.keplr.experimentalSuggestChain) {
            try {
                // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
                // cosmoshub-3 is integrated to Keplr so the code should return without errors.
                // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
                // If the user approves, the chain will be added to the user's Keplr extension.
                // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
                // If the same chain id is already registered, it will resolve and not require the user interactions.
                await window.keplr.experimentalSuggestChain({
                  "chainId": "nyancat-9",
                  "chainName": "Irishub GON",
                  "rpc": "https://rpc.nyancat.rainbow.one",
                  "rest": "https://grpc.nyancat.rainbow.one",
                  "stakeCurrency": {
                    "coinDenom": "NYAN",
                    "coinMinimalDenom": "unyan",
                    "coinDecimals": 6
                  },
                  "bip44": {
                    "coinType": 118
                  },
                  "bech32Config": {
                    "bech32PrefixAccAddr": "iaa",
                    "bech32PrefixAccPub": "iaapub",
                    "bech32PrefixValAddr": "iaavaloper",
                    "bech32PrefixValPub": "iaavaloperpub",
                    "bech32PrefixConsAddr": "iaavalcons",
                    "bech32PrefixConsPub": "iaavalconspub"
                  },
                  "currencies": [
                    {
                      "coinDenom": "NYAN",
                      "coinMinimalDenom": "unyan",
                      "coinDecimals": 6
                    }
                  ],
                      "feeCurrencies": [
                        {
                          "coinDenom": "NYAN",
                            "coinMinimalDenom": "unyan",
                            "coinDecimals": 6,
                            "gasPriceStep": {
                              "low": 0.01,
                              "average": 0.025,
                              "high": 0.25
                            }
                          }
                        ],
                        "coinType": 118,
                        "beta": true
					
			
				
                });

                // location.reload();
            } catch {
                alert("Failed to suggest the chain");
                // location.reload();
            }
        } else {
            alert("Please use the recent version of keplr extension");
        }
    }
}

async function addUptickNetwork() { 
  
if (!window.getOfflineSigner || !window.keplr) {
   console.log('Please install keplr extension');
} else {
   if (window.keplr.experimentalSuggestChain) {
       try {
           // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
           // cosmoshub-3 is integrated to Keplr so the code should return without errors.
           // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
           // If the user approves, the chain will be added to the user's Keplr extension.
           // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
           // If the same chain id is already registered, it will resolve and not require the user interactions.
		   console.log("process.env.VUE_APP_UPTICK_CHAIN_ID",process.env.VUE_APP_UPTICK_CHAIN_ID,process.env.VUE_APP_UPTICK_CHAIN_NAME,process.env.VUE_APP_UPTICK_RPC,process.env.VUE_APP_UPTICK_REST)
		   await window.keplr.experimentalSuggestChain({
		       // Chain-id of the Osmosis chain.
		       chainId: process.env.VUE_APP_UPTICK_CHAIN_ID,
		       // # UPTICK环境
		           
		   
		       // The name of the chain to be displayed to the user.
		       chainName:  process.env.VUE_APP_UPTICK_CHAIN_NAME,
		       // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
		       rpc: process.env.VUE_APP_UPTICK_RPC,
		       // REST endpoint of the chain.
		       rest: process.env.VUE_APP_UPTICK_REST,
		       // Staking coin information
		       stakeCurrency: {
		           coinDenom: "UPTICK",
		           coinMinimalDenom: "auoc",
		           coinDecimals: 18,
		   
		       },
		   
		       bip44: {
		       
		           coinType: 60,
		       },
		      
		       bech32Config: {
		           bech32PrefixAccAddr: "uptick",
		           bech32PrefixAccPub: "uptickpub",
		           bech32PrefixValAddr: "uptickvaloper",
		           bech32PrefixValPub: "uptickvaloperpub",
		           bech32PrefixConsAddr: "uptickvalcons",
		           bech32PrefixConsPub: "uptickvalconspub",
		       },
		       currencies: [
		           {
		               coinDenom: "UPTICK",
		               coinMinimalDenom: "auoc",
		               coinDecimals: 18,
		           },
		       ],
		       // List of coin/tokens used as a fee token in this chain.
		       feeCurrencies: [
		           {
		               coinDenom: "UPTICK",
		               coinMinimalDenom: "auoc",
		               coinDecimals: 18,
		           },
		       ],
		     
		       coinType: 60,
		      
		       gasPriceStep: {
		         low: 1 * 100000000000,
		         average: 2 * 100000000000,
		         high: 4 * 100000000000,
		       },
		       
		               
		                 
		       features:['ibc-transfer','ibc-go', 'eth-address-gen', 'eth-key-sign']
		   });
		   

           // location.reload();
       } catch {
           alert("Failed to suggest the chain");
           // location.reload();
       }
   } else {
       alert("Please use the recent version of keplr extension");
   }
}
}
export const getkeplrIrisAddress = async () => {
	var web3;
	if (window.keplr) {
		// Modern dapp browsers
		try {
			const chainId = "nyancat-9";
			await window.keplr.enable(chainId);
			web3 = await window.getOfflineSigner(chainId);

			//xxl TODO tochange the keystore
			window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
      let account = await web3.getAccounts();
      console.log(account)
   	  return account[0].address

		} catch (error) {
			console.log('denied');
      // this.$Message.error(error);
      throw new Error(error)
		}
	} else {
		// this.$Message.error('请连接kepla钱包！');
    throw new Error("Please link kepla wallet！")
	}
};
export const getkeplrUptickAddress = async () => {
	var web3;
	if (window.keplr) {
		// Modern dapp browsers
		try {

			const chainId = "origin_1170-3";
			await window.keplr.enable(chainId);
			web3 = await window.getOfflineSigner(chainId);

			//xxl TODO tochange the keystore
			window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
      let account = await web3.getAccounts();
      console.log(account)
      return account[0].address

		} catch (error) {
			console.log('denied');
      throw new Error(error)
		}
	} else {
		// this.$Message.error('请连接kepla钱包！');
    throw new Error("Please link kepla wallet！")

	}
	//  var balance = web3.eth.getBalance("iaa1xhhf3a80n7zamu32dyku77lactynx9sgs0vvz4");

	//  console.log("accountBalance -----")
	//  console.log(balance)

};
export const keplrKeystoreChange = async () => {
  console.log('keplrKeystoreChange');
  window.removeEventListener("keplr_keystorechange", keplrKeystoreChange);
  let account = await getkeplrIrisAddress();
  store.commit("SET_DID", account.toLowerCase());
          
         // uptick Address
    let uptickAccount = await getkeplrUptickAddress();
  store.commit("SET_UPTICK_DID", uptickAccount.toLowerCase());
  let accountInfo =  await getIirsAccoutInfo();
  localStorage.setItem('userInfo',JSON.stringify(accountInfo))
  location.reload();


  
}
export async function initWallet() {
   await  addIRISNetwork();
   await  addUptickNetwork();
}