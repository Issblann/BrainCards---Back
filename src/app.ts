import express from 'express';
import routes from './routes';
const app = express();

app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
