import HTTPTransport from '@/shared/services/http';
import { IAuth } from '@/shared/models/auth.interface';
import { IAuthApi } from '@/shared/models/api/auth-api.interface';
import { IUser } from '@/shared/models/user.interface';

const authAPIInstance = new HTTPTransport('/auth');

export class AuthAPI implements IAuthApi {
  create(data: IUser) {
    return authAPIInstance.post('/signup', { data });
  }

  request() {
    return authAPIInstance.get('/user');
  }

  signIn(data: IAuth) {
    return authAPIInstance.post('/signin', { data });
  }

  logout() {
    return authAPIInstance.post('/logout');
  }
}
