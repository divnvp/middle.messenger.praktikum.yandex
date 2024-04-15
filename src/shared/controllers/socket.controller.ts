import { GET_OLD_TYPE, SocketEvents } from '@/shared/const/socket-events.enum';
import { IMessage } from '@/shared/models/message.interface';
import { MessageOrArray } from '@/shared/models/types';
import Socket from '@/shared/utils/socket';
import store from '@/shared/storage/store';
import { WS_HOST } from '@/shared/const/api';

class SocketController {
  private clients: { chatId: number; socket: Socket }[] = [];

  get doesCurrentChatExists() {
    return store.getState().currentChat;
  }

  get userId() {
    return store.getState().user?.id;
  }

  async open(token: string, chatId: number) {
    if (this.clients.find(v => v.chatId === chatId)) {
      return;
    }

    await this.connectToSocket(chatId, this.userId, token);
    this.getPrevious(chatId);
  }

  publish(chatId: number, message: string) {
    const index = this.clients.findIndex(v => v.chatId === chatId);
    this.clients[index].socket.send({ type: SocketEvents.Message, content: message });
  }

  socketRemove() {
    if (this.clients.length) {
      [...this.clients].forEach(ws => ws.socket.close());
    }
  }

  private async connectToSocket(chatId: number, userId: number, token: string) {
    try {
      const ws = new Socket(`${WS_HOST}${userId}/${chatId}/${token}`);
      this.clients.push({ chatId, socket: ws });

      await ws.getPromiseOpen();

      ws.on(SocketEvents.Message, event => this.setMessages(chatId, event as IMessage));

      ws.on(SocketEvents.Close, () => {
        const index = this.clients.findIndex(v => v.chatId === chatId);
        this.clients.splice(index, 1);
      });
    } catch (e) {
      throw new Error(String(e));
    }
  }

  private setMessages(chatId: number, dialog: MessageOrArray) {
    const oldMessages = store.getState().dialogs?.[chatId] || [];
    let newMessages: IMessage[] = [];

    if (dialog instanceof Array) {
      newMessages = dialog;
    } else {
      newMessages.push(dialog);
    }

    store.set(`dialogs.${chatId}`, newMessages.concat(oldMessages));
  }

  private getPrevious(chatId: number) {
    const index = this.clients.findIndex(v => v.chatId === chatId);
    this.clients[index].socket.send({ type: GET_OLD_TYPE, content: '0' });
  }
}

export default new SocketController();
