import { HttpRequest, HttpResponse } from '@controllers/protocols';
import { User } from '@models/User';

export interface UpdateUserParams {
  username?: string;
  password?: string;
  email?: string;
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser: (id: string, params: UpdateUserParams) => Promise<User>;
}
