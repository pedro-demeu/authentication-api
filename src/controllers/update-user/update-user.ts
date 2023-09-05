import { HttpRequest, HttpResponse, IController } from '@controllers/protocols';
import { User } from '@models/User';
import { IUpdateUserRepository, UpdateUserParams } from './protocols';

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: 'missing_body',
        };
      }

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

      const user = await this.updateUserRepository.updateUser(id, body!);

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
