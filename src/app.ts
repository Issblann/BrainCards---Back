import express from 'express';
import routes from './routes';
import envs from './config/env';
const app = express();

app.use(express.json());

app.use('/', routes);

const port = envs.port || 3000;

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
