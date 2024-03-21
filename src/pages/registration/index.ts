import { Block } from '@/shared/utils/block';
import registrationTemplate from '@/pages/registration/page/template';

export class RegistrationPage extends Block {
  override render() {
    return this.compile(registrationTemplate);
  }
}
