import { HttpRequest, HttpResponse } from '@controllers/protocols';
import { User } from '@models/User';
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from './protocols';

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: `missing_param_id`,
        };
      }
      const allowedFields: (keyof UpdateUserParams)[] = [
        'username',
        'password',
        'email',
      ];
      const someFieldIsNotAllowedToBeUpdated = Object.keys(body).some(
        key => !allowedFields.includes(key as keyof UpdateUserParams),
      );

      if (someFieldIsNotAllowedToBeUpdated) {
        return {
          statusCode: 400,
          body: 'some_field_is_not_allowed_to_be_updated',
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
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
