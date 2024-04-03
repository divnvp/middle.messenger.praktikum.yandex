import { Block } from '@/shared/utils/block';
import profileDataTemplate from '@/pages/profile-data/page/template';

export class ProfileDataPage extends Block {
  override render() {
    return this.compile(profileDataTemplate);
  }
}
