import { Block } from '@/shared/utils/block';
import { onLoad } from '@/shared/utils/load';
import profileDataTemplate from '@/pages/profile-data/page/template';

export class ProfileDataPage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(profileDataTemplate);
  }

  private onLoad() {
    onLoad('profile-data');
  }
}
