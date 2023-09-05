import {
  ILoginRepository,
  LoginParams,
  LoginResponse,
} from '@controllers/login/protocols';
import { HttpResponse } from '@controllers/protocols';
import { MongoClient } from '../../database/mongo';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export class MongoLoginRepository implements ILoginRepository {
  async makeLogin(params: LoginParams): Promise<HttpResponse<LoginResponse>> {
    const { username, password } = params;

    if (!username || !password) {
    }

    const userExists = await MongoClient.db.collection('users').findOne({
      username,
    });

    if (!userExists) {
      return {
        statusCode: 400,
        body: 'user_not_found',
      };
    }

    if (password !== userExists.password) {
      return {
        statusCode: 400,
        body: 'invalid_password',
      };
    }

    const secret = process.env.SECRET || 'asiklç$hjv235BQ5Y';
    const token = jwt.sign(
      {
        id: new ObjectId(userExists._id).toHexString(),
      },
      secret,
      {
        expiresIn: '1d',
      },
    );

    return {
      statusCode: 200,
      body: {
        id: new ObjectId(userExists._id).toHexString(),
        token,
      },
    };
  }
}
