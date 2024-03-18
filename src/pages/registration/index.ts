import { Block } from '@/shared/utils/block';
import { onLoad } from '@/shared/utils/load';
import registrationTemplate from '@/pages/registration/page/template';

export class RegistrationPage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(registrationTemplate);
  }

  private onLoad() {
    onLoad('registration');
  }
}
