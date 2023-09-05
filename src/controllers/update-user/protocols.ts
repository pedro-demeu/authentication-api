import { User } from '@models/User';

export interface UpdateUserParams {
  username?: string;
  password?: string;
  email?: string;
}

export interface IUpdateUserRepository {
  updateUser: (id: string, params: UpdateUserParams) => Promise<User>;
}
