import { MongoGetDetailUserRepository } from '../repositories/get-detail-user/mongo-get-detail-user';
import { CreateUserController } from '../controllers/create-user/create-user';
import { DeleteUserController } from '../controllers/delete-user/delete-user';
import { GetUsersController } from '../controllers/get-users/get-users';
import { UpdateUserController } from '../controllers/update-user/update-user';
import { MongoCreateUserRepository } from '../repositories/create-user/mongo-create-user';
import { MongoDeleteUserRepository } from '../repositories/delete-user/mongo-delete-user';
import { MongoGetUsersRepository } from '../repositories/get-users/mongo-get-users';
import { MongoUpdateUserRepository } from '../repositories/update-user/mongo-update-user';
import { Router } from 'express';
import { GetUserDetailController } from '../controllers/get-detail-user/get-detail-user';

export const routes = Router();

routes.get('/', async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

routes.post('/', async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository,
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

routes.get('/:id', async (req, res) => {
  const mongoGetDetailUserRepository = new MongoGetDetailUserRepository();
  const getDetailUserController = new GetUserDetailController(
    mongoGetDetailUserRepository,
  );

  const { body, statusCode } = await getDetailUserController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

routes.put('/:id', async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository,
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

routes.delete('/:id', async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository,
  );

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
