import { HttpRequest, HttpResponse, IController } from '@controllers/protocols';
import { ILoginRepository, LoginParams, LoginResponse } from './protocols';

export class LoginController implements IController {
  constructor(private readonly loginRepository: ILoginRepository) {}

  async handle(
    httpRequest: HttpRequest<LoginParams>,
  ): Promise<HttpResponse<LoginResponse>> {
    try {
      const { body } = httpRequest;
      const requiredFields = ['username', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof LoginParams]?.length) {
          return {
            statusCode: 400,
            body: `missing_param_${field}`,
          };
        }
      }

      if (!body) {
        return {
          statusCode: 400,
          body: 'missing_body',
        };
      }

      const user = await this.loginRepository.makeLogin(body);
      return {
        statusCode: user.statusCode,
        body: user.body,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'internal_server_error',
      };
    }
  }
}
