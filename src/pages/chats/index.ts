import './chat.scss';
import Block from '@/shared/utils/block';
import ChatController from '@/shared/controllers/chat.controller';
import { ChatList } from '@/components/chat-list';
import { ChatMessage } from '@/components/chat-message';
import { Menu } from '@/components/menu';
import store from '@/shared/storage/store';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  menu: Menu;
  chatMessage: ChatMessage;
}

export default class ChatPage extends Block<IProps> {
  constructor() {
    super({
      menu: new Menu(),
      chatMessage: new ChatMessage()
    });

    ChatController.getChats();
  }

  override init() {
    this.child['chatList'] = new ChatList({ chats: store.getState().chats });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
