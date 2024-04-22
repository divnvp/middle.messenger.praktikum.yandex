import { ChatsAPI } from '../api/chat-api';
import { IChat } from '../models/chat.interface';
import SocketController from '../controllers/socket.controller';
import store from '../storage/store';

class ChatsController {
  private readonly chatsInstanceAPI = new ChatsAPI();

  async create(title: string) {
    try {
      await this.chatsInstanceAPI.create(title);

      await this.getChats();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async getChats() {
    try {
      const response = await this.chatsInstanceAPI.request();
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
      await this.chatsInstanceAPI.addUsersToChat(userId, chatId);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async deleteUser(chatId: number, userId: number) {
    try {
      await this.chatsInstanceAPI.removeUsersFromChat(userId, chatId);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async delete(id: number) {
    try {
      const response = await this.chatsInstanceAPI.remove(id);

      if (response) {
        store.set('currentChat', null);
      }

      await this.getChats();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async getToken(id: number) {
    const response = await this.chatsInstanceAPI.getToken(id);
    return response.response.token;
  }

  async getChatUsers(id: number) {
    try {
      const response = await this.chatsInstanceAPI.getChatUsers(id);
      store.set('currentChatUsers', response.response);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  selectChat(chat: IChat) {
    store.set('currentChat', chat);
  }
}

export default new ChatsController();
