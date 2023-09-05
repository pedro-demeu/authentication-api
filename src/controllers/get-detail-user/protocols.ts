import { User } from '@models/User';

export interface IGetDetailUserRepository {
  getUser(id: string): Promise<User>;
}
