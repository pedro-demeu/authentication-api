import { HttpRequest, HttpResponse } from '@controllers/protocols';
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from './protocols';
import { User } from '@models/User';
import validator from 'validator';

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = httpRequest;

      const requiredFields = [
        'username',
        'firstName',
        'lastName',
        'email',
        'password',
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `missing_param_${field}`,
          };
        }
      }
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: 'invalid_email',
        };
      }

      if (!body) {
        return {
          statusCode: 400,
          body: 'missing_body',
        };
      }

      const user = await this.createUserRepository.createUser(body);
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'internal_server_error',
      };
    }
  }
}
