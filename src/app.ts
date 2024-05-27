import express from 'express';
import usersRoutes from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/api', usersRoutes);
const startServer = async () => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};
startServer();
