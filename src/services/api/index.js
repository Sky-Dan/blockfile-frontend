import axiosLibrary from 'axios';
import { getUserData } from '../../utility/Utils';

const user = getUserData();

export const api = axiosLibrary.create({
  baseURL: process.env.REACT_APP_API_URL,
});

if (user) {
  api.defaults.headers.common['authorization'] = `Bearer ${user.token}`;
}
