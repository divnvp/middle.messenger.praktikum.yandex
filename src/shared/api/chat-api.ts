import { HTTPTransport } from '@/shared/services/http';
import { IChatApi } from '@/shared/models/api/chat-api.interface';

export class ChatsAPI implements IChatApi {
  private chatAPIInstance = new HTTPTransport('/chats');

  create(title: string) {
    return this.chatAPIInstance.post('', { title });
  }

  remove(id: number) {
    return this.chatAPIInstance.delete('', { chatId: id });
  }

  request() {
    return this.chatAPIInstance.get('');
  }

  addUsersToChat(users: number, id: number) {
    return this.chatAPIInstance.put('/users', { users: [users], chatId: id });
  }

  getChatUsers(id: number) {
    return this.chatAPIInstance.get(`/${id}/users`);
  }

  removeUsersFromChat(users: number, id: number) {
    return this.chatAPIInstance.delete('/users', { users: [users], chatId: id });
  }

  getToken(id: number) {
    return this.chatAPIInstance.post(`/token/${id}`);
  }

  updateChatAvatar(chatId: number, avatar: unknown) {
    return this.chatAPIInstance.put('/avatar', { chatId, avatar });
  }
}

export default new ChatsAPI();
