import express from 'express';
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';
import { routes as UserRoutes } from './modules/user';
import { routes as AuthRoutes } from './modules/authentication';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  const PORT = process.env.PORT || 3333;

  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT} 🚀`);
  });

  app.use('/v1/api/users', UserRoutes);
  app.use('/v1/api/auth', AuthRoutes);
};

main();
