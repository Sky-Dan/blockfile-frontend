import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

const config: HardhatUserConfig = {
  defaultNetwork: 'mumbai',
  solidity: {
    version: '0.8.6',
    overrides: {},
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/Wg4nVqlhztEcJ_7diz8kMF4jsFLYCh6t',
      accounts: [process.env.PRIVATE_KEY || ''],
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/BywoqFCSE6waHnwFKAqpqyUsPlKu8zQN',
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || '',
    },
  },
};
export default config;
