import { ChatApi } from '@/shared/api/chat-api';
import { onErrorPage } from '@/shared/utils/on-error-page';
import store from '@/shared/storage/store';

export class ChatController {
  private chatAPI = new ChatApi();

  async init() {
    const chats = store.getState().chats;

    if (!chats) {
      await this.getChats();
    }
  }

  async getChats() {
    const response = await this.chatAPI.request();

    onErrorPage(response);
    store.set('chats', JSON.parse(response.response));

    return response.response;
  }

  getChatsFromStore() {
    return store.getState().chats;
  }
}
