import { Block } from '@/shared/utils/block';
import { onLoad } from '@/shared/utils/load';
import profileTemplate from '@/pages/profile/page/template';

export class ProfilePage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(profileTemplate);
  }

  private onLoad() {
    onLoad('profile');
  }
}
