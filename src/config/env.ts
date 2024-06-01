require('dotenv').config();

const envs = {
  port: process.env.PORT || 3000,
  sqlServerURL: process.env.SQLSERVER_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
};

export default envs;
