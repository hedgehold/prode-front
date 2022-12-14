const Web3 = require('web3');
const chainstackURL = process.env.NEXT_PUBLIC_CHAINSTACK;

const options = {
  // Enable auto reconnection
  reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false
  }
};

const ws = new Web3.providers.WebsocketProvider(chainstackURL, options) 
const web3 = new Web3(ws)
// const signer = web3.getSigner();

const contractABI = require('./abi/prodeFactory.json');
const singleProdeABI = require('./abi/prodeBeta.json'); // tomo el ABI del prode puntualmente
const octavosABI = require('./abi/ProdeOct.json');

const contractAddress ='0xeE04C13A9260D5C07335B0212650b19d601Fe62D';

const prodeContract = new web3.eth.Contract(
    contractABI,
    contractAddress
)

/*
export const loadCurrentMessage = async () => { 
    const prodes = await prodeContract.methods.retrieveProdes().call();

    return prodes;  
};*/

export const loadProdes = async() => {
  const prodes = await prodeContract.methods.retrieveProdes().call();
  let prodesFull = [];
  for (const prode of prodes){
    const singleProdeContract = new web3.eth.Contract( singleProdeABI, prode['prodeAddress'] )
    const singleProdeData = await singleProdeContract.methods.debugRetrieveParticipants().call();
    prodesFull.push({...prode, participantsArray: singleProdeData})

  }
  return prodes
};


export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a name for your tourney",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
        return {
            address: "",
            status: ( "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.")
        };
    };
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a name for your tourney",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: ("You must install Metamask 🦊")
    };
 };
}; 

export const createProde = async (address, prode) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      validator: '',
      transaction: '',
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  
  if (prode.nickname?.trim() === "Choose a cool name for your tourney!") {
    return {
      validator: '',
      transaction: '',
      status: <span>"❌ Your tourney need a name."</span>,
    };
  }
  if (!prode.buyin>0) {
    return {
      validator: '',
      transaction: '',
      status: <span>"❌ Your tourney need a buy-in amount."</span>
    };
  }

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x64' }], //Gnosis 100 in hex
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: "0x64",
              chainName: "Gnosis",
              nativeCurrency: {
                  name: "xDai",
                  symbol: "xDai",
                  decimals: 18,
              },
              rpcUrls: ["https://rpc.gnosischain.com/"],
              blockExplorerUrls: ["https://gnosisscan.io/"],
          }
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
  //return
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: prodeContract.methods.createProde(prode.buyin, prode.hidden, prode.nickname).encodeABI(),
  };

  //sign the transaction
  try {
   
    const txn = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
    }); 


    return {
      validator: 'success',
      transaction: txn,
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://gnosisscan.io/tx/${txn}`}>
            View the status of your transaction on Gnosisscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, you can 
          check your slip on tournament details.
                    
          may take up to 90 seconds⌚. Be patient 😊
        </span>
      ),
    }
    } catch (error) {
      console.log(error);   
      return {
        status: "😥 " + error.message,
      };
    }
  };



/*

export const waitTransaction = async(txn) => {
  
  const transactionReceipt = await web3.eth.getTransactionReceipt(txn);
  
  if (transactionReceipt!=null) {
    console.log(`Mined... ${transactionReceipt}`);
      return {
        validator: 'success',
      }
  } else { console.log(`error`) }
  /*
  web3.eth.subscribe('logs', {
    address: contractAddress, topics: [ walletAddess ]
    }, function(error, result){
    if (!error)
      return {validator: result}
    })
    .on("data", function(log){
      return {validator: log}
    })
    .on("changed", function(log){
      return {validator: log}
    });

    
};*/

/////////////////////////////////////////////////// BETTING SLIP \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const loadSingleProde = async() => {
  /// Falta quitar hardcodeo y usar prode['prodeAddress']
  const singleProdeContract = new web3.eth.Contract( singleProdeABI, '0xeE04C13A9260D5C07335B0212650b19d601Fe62D')
  const singleProdeData = await singleProdeContract.methods.debugRetrieveParticipants().call();
  //console.log(singleProdeData)
  return singleProdeData
}

export const placeBet = async (address,  tid, slip, tdata) => {

  const singleProdeContract = new web3.eth.Contract( singleProdeABI, tid )
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x64' }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: "0x64",
              chainName: "Gnosis",
              nativeCurrency: {
                  name: "xDai",
                  symbol: "xDai",
                  decimals: 18,
              },
              rpcUrls: ["https://rpc.gnosischain.com/"],
              blockExplorerUrls: ["https://gnosisscan.io/"],
          }
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }

  // NO PUEDO HARDCODEAR EL VALOR DE VALUE. 
  //set up transaction parameters
  const valueHex = parseInt(tdata.weiBuyin).toString(16)
  let transactionParameters
  try{
    transactionParameters = {
      to: tid, // Required except during contract publications.
      from: address, // must match user's active address.
      data: singleProdeContract.methods.createParticipant(slip.groups, slip.topPicks, slip.nickname).encodeABI(),
      value: valueHex,
      gasLimit: '300000',
    };
  }catch (e){
    console.log(slip.groups, slip.topPicks, slip.nickname)
    console.log(e, tid, address, valueHex)
    return {
      status:
        "💡 Your Betting Slip seems to be incomplete.",
    };
  }


  //sign the transaction
  try {
   
      window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    }).then( 
      async (result) => 
      {
      console.log("Minting... please wait");
      const transactionReceipt = await web3.eth.getTransactionReceipt(result);

      if (transactionReceipt!=null) {
        console.log(`Mined... ${transactionReceipt}`);
      } else { console.log(`error`) }; //getting this
    })  
    

    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://gnosisscan.io`}>
            View the status of your transaction on Gnosisscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, you can 
          check your slip on tournament details.
                    
          may take up to 90 seconds⌚. Be patient 😊
        </span>
    ),
    };
  } catch (error) {
    console.log(error);   
    return {
      status: "😥 " + error.message,
    };
  }
};

export const getTransactionReceiptMined = (txHash, interval) => {
  const self = this;
  const transactionReceiptAsync = function(resolve, reject) {
          web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
          if (error) {
              reject(error);
          } else if (receipt == null) {
            console.log('Receipt Null (por ahora)')
              setTimeout(
                  () => transactionReceiptAsync(resolve, reject),
                  interval ? interval : 500);
          } else {
             const newContractAdddress =  web3.eth.abi.decodeParameter("address", receipt.logs[0].data)
              console.log('El nuevo prode esta en: ', newContractAdddress)
              resolve([receipt, newContractAdddress]);
          }
      });
  };

  if (Array.isArray(txHash)) {
      return Promise.all(txHash.map(
          oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)));
  } else if (typeof txHash === "string") {
      return new Promise(transactionReceiptAsync);
  } else {
      throw new Error("Invalid Type: " + txHash);
  }
};

//////////////////// OCTAVOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const placeBetOctavos = async (address,  tid, slip, tdata) => {

  const singleProdeContract = new web3.eth.Contract( octavosABI, tid )
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x64' }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: "0x64",
              chainName: "Gnosis",
              nativeCurrency: {
                  name: "xDai",
                  symbol: "xDai",
                  decimals: 18,
              },
              rpcUrls: ["https://rpc.gnosischain.com/"],
              blockExplorerUrls: ["https://gnosisscan.io/"],
          }
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }

  //set up transaction parameters
  const valueHex = parseInt(tdata.weiBuyin).toString(16)
  let transactionParameters
  try{
    transactionParameters = {
      to: tid, // Required except during contract publications.
      from: address, // must match user's active address.
      data: singleProdeContract.methods.createParticipant(slip.octavos, slip.nickname).encodeABI(),
      value: valueHex,
      gasLimit: '300000',
    };
  }catch (e){
    console.log(slip.octavos, slip.nickname)
    console.log(e, tid, address, valueHex)
    return {
      status:
        "💡 Your Betting Slip seems to be incomplete.",
    };
  }


  //sign the transaction
  try {
   
      window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    }).then( 
      async (result) => 
      {
      console.log("Minting... please wait");
      const transactionReceipt = await web3.eth.getTransactionReceipt(result);

      if (transactionReceipt!=null) {
        console.log(`Mined... ${transactionReceipt}`);
      } else { console.log(`error`) }; //getting this
    })  
    

    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://gnosisscan.io`}>
            View the status of your transaction on Gnosisscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, you can 
          check your slip on tournament details.
                    
          may take up to 90 seconds⌚. Be patient 😊
        </span>
    ),
    };
  } catch (error) {
    console.log(error);   
    return {
      status: "😥 " + error.message,
    };
  }
};
