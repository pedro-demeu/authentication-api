import { MongoClient } from '../../database/mongo';
import { ObjectId } from 'mongodb';
import { User } from '@models/User';
import { IGetDetailUserRepository } from '@controllers/get-detail-user/protocols';

export class MongoGetDetailUserRepository implements IGetDetailUserRepository {
  async getUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({
        _id: new ObjectId(id),
      });

    if (!user) {
      throw new Error('user_not_found');
    }
    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
