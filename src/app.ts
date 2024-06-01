import express from 'express';
import routes from './routes';
import envs from './config/env';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
const corsOptions = {
  origin: envs.clientUrl,
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE',
};

app.use(cors(corsOptions));

const port = envs.port || 3000;

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
