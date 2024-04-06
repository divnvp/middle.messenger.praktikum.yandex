import { HOST } from '@/shared/const/api';
import { ResourcesAPI } from '@/shared/api/resources-api';
import store from '@/shared/storage/store';

export class ResourcesController {
  private readonly resourcesAPI = new ResourcesAPI();

  async getUserAvatar() {
    try {
      return await this.resourcesAPI.request(store.getState().user?.avatar);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  getUserAvatarString() {
    return `${HOST}/resources/${store.getState().user?.avatar}`;
  }
}
