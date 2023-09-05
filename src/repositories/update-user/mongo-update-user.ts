import { UpdateUserParams } from '@controllers/update-user/protocols';
import { MongoClient } from '../../database/mongo';
import { ObjectId } from 'mongodb';
import { User } from '@models/User';

export class MongoUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      },
    );

    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error('user_not_updated');
    }
    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
