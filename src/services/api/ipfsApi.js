import axios from 'axios';

export const ipfsApi = axios.create({
  baseURL: process.env.REACT_APP_IPFS_API_URL,
});
