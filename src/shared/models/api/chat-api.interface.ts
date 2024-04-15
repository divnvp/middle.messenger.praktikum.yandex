export interface IChatApi {
  create: (title: string) => Promise<XMLHttpRequest>;
  remove: (chatId: number) => Promise<XMLHttpRequest>;
  request: () => Promise<XMLHttpRequest>;
  addUsersToChat: (users: number, id: number) => Promise<XMLHttpRequest>;
  getChatUsers: (id: number) => Promise<XMLHttpRequest>;
  removeUsersFromChat: (users: number, id: number) => Promise<XMLHttpRequest>;
  getToken: (id: number) => Promise<XMLHttpRequest>;
  updateChatAvatar: (chatId: number, avatar: FormData) => Promise<XMLHttpRequest>;
}
