import {
  CreateUserParams,
  ICreateUserRepository,
} from '@controllers/create-user/protocols';
import { User } from '@models/User';
import { MongoClient } from '../../database/mongo';

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection('users')
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({ _id: insertedId });

    if (!user) throw new Error('user_not_created');

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
