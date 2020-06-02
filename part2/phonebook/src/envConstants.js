const prod = {
  API_URL: '/api/persons',
};

const dev = {
  API_URL: 'http://localhost:3001/api/persons',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
