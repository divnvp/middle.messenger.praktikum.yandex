import { Block } from '@/shared/utils/block';
import changePasswordTemplate from '@/pages/change-password/page/template';
import { onLoad } from '@/shared/utils/load';

export class ChangePasswordPage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(changePasswordTemplate);
  }

  private onLoad() {
    onLoad('change-password');
  }
}
