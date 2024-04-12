import { GET_OLD_TYPE, SocketEvents } from '@/shared/const/socket-events.enum';
import { IMessage } from '@/shared/models/message.interface';
import Socket from '@/shared/utils/socket';
import store from '@/shared/storage/store';
import { WS_HOST } from '@/shared/const/api';

class SocketController {
  private clients = new Map();

  get doesCurrentChatExists() {
    return store.getState().currentChat;
  }

  get userId() {
    return store.getState().user?.id;
  }

  async open(token: string, chatId: number) {
    if (this.clients.has(chatId)) {
      return;
    }

    await this.connectToSocket(chatId, this.userId, token);
    this.getPrevious(chatId);
  }

  publish(id: number, message: string) {
    this.clients.get(id)?.send({ type: SocketEvents.Message, content: message });
  }

  socketRemove() {
    [...this.clients.values()].forEach(ws => ws.close());
  }

  private async connectToSocket(chatId: number, userId: number, token: string) {
    try {
      const ws = new Socket(`${WS_HOST}${userId}/${chatId}/${token}`);
      this.clients.set(chatId, ws);

      await ws.getPromiseOpen();

      ws.on(SocketEvents.Message, event => this.setMessages(chatId, event as IMessage));

      ws.on(SocketEvents.Close, () => {
        this.clients.delete(chatId);
      });
    } catch (e) {
      throw new Error(String(e));
    }
  }

  private setMessages(chatId: number, dialog: IMessage | []) {
    const oldMessages = store.getState().dialogs?.[chatId] || [];
    let newMessages: IMessage[] = [];

    if (dialog instanceof Array) {
      newMessages = dialog;
    } else {
      newMessages.push(dialog);
    }

    store.set(`dialogs.${chatId}`, newMessages.concat(oldMessages));
  }

  private getPrevious(id: number) {
    this.clients.get(id)?.send({ content: '0', type: GET_OLD_TYPE });
  }
}

export default new SocketController();
