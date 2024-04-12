import { ChatsAPI } from '@/shared/api/chat-api';
import { IChat } from '@/shared/models/chat.interface';
import SocketController from '@/shared/controllers/socket.controller';
import store from '@/shared/storage/store';

class ChatsController {
  private readonly api = new ChatsAPI();

  async create(title: string) {
    try {
      await this.api.create(title);

      await this.getChats();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async getChats() {
    try {
      const response = await this.api.request();
      const chats = response.response;

      chats.map(async (chat: IChat) => {
        const token = await this.getToken(chat.id);
        await SocketController.open(token as string, chat.id);
      });

      store.set('chats', chats);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async addUser(chatId: number, userId: number) {
    try {
      await this.api.addUsersToChat(userId, chatId);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async deleteUser(chatId: number, userId: number) {
    try {
      await this.api.removeUsersFromChat(userId, chatId);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.remove(id);

      if (response) {
        store.set('currentChat', null);
      }

      await this.getChats();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async getToken(id: number) {
    const response = await this.api.getToken(id);
    return response.response.token;
  }

  public selectChat(chat: IChat) {
    store.set('currentChat', chat);
  }
}

export default new ChatsController();
