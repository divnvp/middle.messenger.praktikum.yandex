import { IChat } from '@/shared/models/chat.interface';

export interface IChatApi {
  create: (data: IChat) => Promise<XMLHttpRequest>;
  createChatArchive: (chatId: number) => Promise<XMLHttpRequest>;
  unArchiveChat: (chatId: number) => Promise<XMLHttpRequest>;
  remove: (chatId: number) => Promise<XMLHttpRequest>;
  request: () => Promise<XMLHttpRequest>;
  getChatFiles: (chatId: number) => Promise<XMLHttpRequest>;
  getChatArchive: () => Promise<XMLHttpRequest>;
}
