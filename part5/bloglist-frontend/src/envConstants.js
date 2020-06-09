const prod = {
  BLOGS_API_URL: 'api/blogs',
  LOGIN_API_URL: 'api/login',
};

const dev = {
  BLOGS_API_URL: 'http://localhost:3001/api/blogs',
  LOGIN_API_URL: 'http://localhost:3001/api/login',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
