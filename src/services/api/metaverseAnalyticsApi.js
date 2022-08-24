import axios from 'axios';

export const metaverseAnalyticsApi = axios.create({
  baseURL: process.env.REACT_APP_METAVERSE_ANALYTICS_API_URL,
});
