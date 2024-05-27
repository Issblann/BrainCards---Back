require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  sqlServerURL: process.env.SQLSERVER_URL,
  jwtSecret: process.env.JWT_SECRET,
};
