import { User } from '@models/User';

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
