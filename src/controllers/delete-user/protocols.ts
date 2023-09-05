import { HttpRequest, HttpResponse } from '@controllers/protocols';
import { User } from '@models/User';

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}

export interface IDeleteUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}
