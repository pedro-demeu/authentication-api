import { User } from '@models/User';
import { HttpRequest, HttpResponse } from '@controllers/protocols';

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>>;
}
export interface CreateUserParams {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
