import authTemplate from '@/pages/auth/page/template';
import { Block } from '@/shared/utils/block';

export class AuthPage extends Block {
  override render() {
    return this.compile(authTemplate);
  }
}
