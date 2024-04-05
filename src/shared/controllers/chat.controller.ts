import { ChatApi } from '@/shared/api/chat-api';
import { IChat } from '@/shared/models/chat.interface';
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

  async createChat(title: IChat) {
    try {
      const response = await this.chatAPI.create(title);
      onErrorPage(response);

      await this.getChats();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  getChatsFromStore() {
    return store.getState().chats;
  }
}
