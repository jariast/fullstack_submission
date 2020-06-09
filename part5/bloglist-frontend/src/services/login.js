import axios from 'axios';
import { config } from '../envConstants';
const baseUrl = config.LOGIN_API_URL;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
