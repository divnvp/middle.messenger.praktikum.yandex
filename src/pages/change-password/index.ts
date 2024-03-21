import { Block } from '@/shared/utils/block';
import changePasswordTemplate from '@/pages/change-password/page/template';

export class ChangePasswordPage extends Block {
  override render() {
    return this.compile(changePasswordTemplate);
  }
}
