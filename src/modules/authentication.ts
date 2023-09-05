import { Router } from 'express';
import { MongoLoginRepository } from '../repositories/login/mongo-login';
import { LoginController } from '../controllers/login/login';

export const routes = Router();
routes.post('/login', async (req, res) => {
  const mongoLoginRepository = new MongoLoginRepository();
  const loginController = new LoginController(mongoLoginRepository);

  const { body, statusCode } = await loginController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
