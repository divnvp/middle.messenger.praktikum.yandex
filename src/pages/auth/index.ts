import authTemplate from '@/pages/auth/page/template';
import { Block } from '@/shared/utils/block';
import { onLoad } from '@/shared/utils/load';

export class AuthPage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(authTemplate);
  }

  private onLoad() {
    onLoad('auth');
  }
}
