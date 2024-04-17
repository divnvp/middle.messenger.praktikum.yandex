import { HTTPTransport } from '../services/http';
import { IAuth } from '../models/auth.interface';
import { IAuthApi } from '../models/api/auth-api.interface';
import { IUser } from '../models/user.interface';

export class AuthAPI implements IAuthApi {
  private authAPIInstance = new HTTPTransport('/auth');

  create(data: IUser) {
    return this.authAPIInstance.post('/signup', data);
  }

  request() {
    return this.authAPIInstance.get('/user');
  }

  signIn(data: IAuth) {
    return this.authAPIInstance.post('/signin', data);
  }

  logout() {
    return this.authAPIInstance.post('/logout');
  }
}

export default new AuthAPI();
