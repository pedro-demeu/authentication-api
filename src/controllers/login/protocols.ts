import { HttpResponse } from '@controllers/protocols';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  token: string;
}

export interface ILoginRepository {
  makeLogin(params: LoginParams): Promise<HttpResponse<LoginResponse>>;
}
