import { SocketEvents, SocketHeartbeatEnum } from '@/shared/const/socket-events.enum';
import EventBus from '@/shared/utils/event-bus';

export default class Socket extends EventBus {
  private interval: number = 0;
  private readonly timeout = 5 * 1000;
  private readonly socket?: WebSocket;

  constructor(private path: string) {
    super();

    this.socket = new WebSocket(this.path);
  }

  getPromiseOpen() {
    this.onEventListeners(this.socket!);
    this.onPing();

    return new Promise<void>(resolve => {
      this.on(SocketEvents.Open, () => {
        resolve();
      });
    });
  }

  close() {
    this.socket?.close();
  }

  send(data: unknown) {
    if (this.socket) {
      this.socket.send(JSON.stringify(data));
    } else {
      throw new Error();
    }
  }

  private onPing() {
    this.interval = setInterval(() => {
      this.send({ type: SocketHeartbeatEnum.Ping });
    }, this.timeout) as unknown as number;

    this.on(SocketEvents.Close, () => {
      clearInterval(this.interval);

      this.resetInterval();
    });
  }

  private resetInterval() {
    this.interval = 0;
  }

  private onEventListeners(socket: WebSocket) {
    this.onOpen(socket);
    this.onClose(socket);
    this.onMessage(socket);
  }

  private onOpen(socket: WebSocket) {
    socket.addEventListener(SocketEvents.Open, () => {
      console.log('Соединение установлено');
      this.emit(SocketEvents.Open);
    });
  }

  private onClose(socket: WebSocket) {
    socket.addEventListener(SocketEvents.Close, event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      this.emit(SocketEvents.Close);
    });
  }

  private onMessage(socket: WebSocket) {
    socket.addEventListener(SocketEvents.Message, event => {
      console.log('Получены данные', event.data);
      const message = event.data;
      const data = JSON.parse(message);

      if (data.type === SocketHeartbeatEnum.Pong) {
        return;
      }

      this.emit(SocketEvents.Message, data as never);
    });
  }
}
