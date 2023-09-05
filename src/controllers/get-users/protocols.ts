import { User } from '@models/User';
import { HttpResponse } from '@controllers/protocols';

export interface IGetUsersController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
