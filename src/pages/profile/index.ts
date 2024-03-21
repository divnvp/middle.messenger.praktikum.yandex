import { Block } from '@/shared/utils/block';
import profileTemplate from '@/pages/profile/page/template';

export class ProfilePage extends Block {
  override render() {
    return this.compile(profileTemplate);
  }
}
