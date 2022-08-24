// ** Router Import
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Router from './router/Router';

// import { handleMenuHidden } from '@store/layout';
import { DefaultRoute } from './router/routes';
import { handleLogout } from './redux/auth';
import { getUserData, removeAllLocalstorageAsJson } from './utility/Utils';
import { checkNetworkId, connectMetamaskWallet } from './utility/web3';
import web3Config from './configs/web3Config';
import { api } from './services/api';

const App = () => {
  const dispatch = useDispatch();

  const handleAccount = () => {
    const items = [
      'axies',
      'accounts',
      'transactions',
      'templates',
      'categories',
    ];
    removeAllLocalstorageAsJson(items);
  };

  useEffect(() => {
    if (!!api.defaults.headers.common['x-wallet-address']) {
      handleAccount();
    }

    // const isHidden = window.location.pathname === DefaultRoute;

    // dispatch(handleMenuHidden(isHidden));
  }, []);

  const handleCurrentNetworkId = async () => {
    const currentNetwork = await checkNetworkId();

    return currentNetwork;
  };

  const handleNetworkId = async () => {
    const currentNetwork = handleCurrentNetworkId();
    if (!(currentNetwork === web3Config.networkId)) {
      return (window.location.href = '/wrong-network');
    }

    return (window.location.href = '/');
  };

  useEffect(async () => {
    // const currentNetwork = await handleCurrentNetworkId();

    // if (
    //   window.location.pathname !== '/wrong-network' &&
    //   currentNetwork !== web3Config.networkId
    // ) {
    //   handleNetworkId();
    // } else if (
    //   window.location.pathname === '/wrong-network' &&
    //   currentNetwork === web3Config.networkId
    // ) {
    //   return (window.location.href = '/');
    // }

    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        handleNetworkId();
      });
    }
  }, [window.location.href]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          dispatch(handleLogout());
        }

        const user = getUserData();

        if (user) {
          handleAccount();

          if (accounts[0] !== user.address) connectMetamaskWallet(dispatch);

          // window.location.href = '/';
        }
      });
    }
  }, []);

  return <Router />;
};

export default App;
