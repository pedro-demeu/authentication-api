import { HttpRequest, HttpResponse, IController } from '@controllers/protocols';
import { User } from '@models/User';
import { IGetDetailUserRepository } from './protocols';

export class GetUserDetailController implements IController {
  constructor(
    private readonly getDetailUserRepository: IGetDetailUserRepository,
  ) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'missing_id',
        };
      }

      const user = await this.getDetailUserRepository.getUser(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'something_went_wrong',
      };
    }
  }
}
