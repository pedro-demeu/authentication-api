import { IDeleteUserRepository } from '@controllers/delete-user/protocols';
import { MongoClient } from '../../database/mongo';
import { ObjectId } from 'mongodb';
import { User } from '@models/User';

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({
        _id: new ObjectId(id),
      });

    if (!user) {
      throw new Error('user_not_found');
    }

    const { deletedCount } = await MongoClient.db
      .collection('users')
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (!deletedCount) {
      throw new Error('user_not_deleted');
    }

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
