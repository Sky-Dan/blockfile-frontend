import Web3 from 'web3';

import StorageContract from '../build/artifacts/contracts/Storage.sol/Storage.json';

const contractAddress = process.env.REACT_APP_API_CONTRACT_ADDRESS;
const accountAddress = process.env.REACT_APP_API_ACCOUNT_ADDRESS;
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;

const web3 = new Web3(
  'https://polygon-mainnet.g.alchemy.com/v2/Wg4nVqlhztEcJ_7diz8kMF4jsFLYCh6t'
);

const contract = new web3.eth.Contract(StorageContract.abi, contractAddress);

const useContract = () => {
  const handleStoreFile = async (hash) => {
    // const block = await web3.eth.getBlock('latest');

    const nonce = await web3.eth.getTransactionCount(accountAddress);

    const tx = {
      from: accountAddress,
      to: contractAddress,
      value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
      gas: web3.utils.toHex(310000),
      // gasPrice: web3.utils.toHex(210000),
      // gasLimit: block.gasLimit,
      data: await contract.methods.store(hash).encodeABI(),
      nonce,
      chainId: await web3.eth.getChainId(),
    };

    console.log(tx);

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const transaction = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return transaction;
  };

  const handleValidateFile = async (hash) => {
    const transaction = await contract.methods.validate(hash).call();

    return transaction;
  };

  return { handleStoreFile, handleValidateFile };
};

export default useContract;
