import axios from 'axios';
import { config } from '../envConstants';
const baseUrl = config.BLOGS_API_URL;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
