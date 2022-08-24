import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Web3Token from 'web3-token';

import { api } from '../../services/api';
// import web3Config from '../../configs/web3Config';
import { handleConnect } from '../../redux/auth';
import { WarningToast } from '../../views/components/toasts/Error';

export const checkNetworkId = async () => {
  const networkId = await ethereum.request({
    method: 'net_version',
  });

  return networkId;
};

export const connectMetamaskWallet = async (dispatch) => {
  if (window.ethereum) {
    try {
      // if (!((await checkNetworkId()) === web3Config.networkId)) {
      //   return toast.warning(
      //     <WarningToast description="Switch to Ethereum Mainnet network" />
      //   );
      // }

      await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.signMessage('Authentication');
      const address = await signer.getAddress();

      const user = await api.post('/users', { publicAddress: address });

      const token = await Web3Token.sign(
        async (msg) => await signer.signMessage(msg),
        {
          domain: '',
          expire_in: '1d',
          nonce: user.data.user.id,
        }
      );

      const userData = { address, token };

      dispatch(handleConnect({ userData }));
      return { address };
    } catch (error) {
      console.error(error);
    }
  } else {
    return toast.warning(
      <WarningToast description="You must install MetaMask" />
    );
  }
};

export const isConnectedMetamaskWallet = () => {
  if (window.ethereum) {
    return window.ethereum.isConnected();
  }
};

export const disconnectMetamaskWallet = () => {};
