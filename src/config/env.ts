require('dotenv').config();

const envs = {
  port: process.env.PORT || 3000,
  postgresSQLURL: process.env.POSTGRESQL_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  openaiKey: process.env.OPENAI_API_KEY,
  openainOrgId: process.env.OPENAI_ORG_ID,
};

export default envs;
