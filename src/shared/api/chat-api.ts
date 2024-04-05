import HTTPTransport from '@/shared/services/http';
import { IChat } from '@/shared/models/chat.interface';
import { IChatApi } from '@/shared/models/api/chat-api.interface';

const chatAPIInstance = new HTTPTransport('/chats');

export class ChatApi implements IChatApi {
  request() {
    return chatAPIInstance.get('');
  }

  getChatFiles(chatId: number) {
    return chatAPIInstance.get(`/${chatId}/files`);
  }

  getChatArchive() {
    return chatAPIInstance.get('/archive');
  }

  create(data: IChat) {
    return chatAPIInstance.post('', { data });
  }

  createChatArchive(chatId: number) {
    return chatAPIInstance.post('/archive', { data: { archiveChatRequest: { chatId } } });
  }

  unArchiveChat(chatId: number) {
    return chatAPIInstance.post('/archive', { data: { unarchiveChatRequest: { chatId } } });
  }

  remove(chatId: number) {
    return chatAPIInstance.delete('', { data: { chatId } });
  }
}
