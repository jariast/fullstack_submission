import axios from 'axios';
import { config } from '../envConstants';
const baseUrl = config.BLOGS_API_URL;

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

export default { getAll, setToken, create };
