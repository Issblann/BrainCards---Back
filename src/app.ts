import express from 'express';
import routes from './routes';
import envs from './config/env';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerui from 'swagger-ui-express';

import { swaggerSpecs } from './routes/swagger';
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', envs.clientUrl as string);

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true.toString());
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  next();
});
app.use(cookieParser());

app.use('/', routes);

const swaggerDocs = (app: any, port: string | number) => {
  app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpecs));
  app.get('/api-docs.json', (res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
  });

  console.log(
    `Swagger docs are available at http://localhost:${port}/api-docs`
  );
};
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpecs));

const corsOptions = {
  origin: envs.clientUrl,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

const port = envs.port || 3000;
app.use('/uploads', express.static('uploads'));

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    swaggerDocs(app, port);
  });
};

startServer();
