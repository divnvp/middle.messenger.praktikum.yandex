import AuthController from '@/shared/controllers/auth.controller';
import Block from '@/shared/utils/block';
import ChatController from '@/shared/controllers/chat.controller';
import { ChatList } from '@/components/chat-list';
import ChatMessagePanel from '@/components/chat-panel';
import { connect } from '@/shared/utils/connect';
import { IChat } from '@/shared/models/chat.interface';
import { IUser } from '@/shared/models/user.interface';
import { Menu } from '@/components/menu';
import store from '@/shared/storage/store';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProp extends TProp {
  user: IUser;
  menu?: Menu;
  chatList?: ChatList;
  chatListPanel?: ChatMessagePanel;
}

class ChatPanelPage extends Block<IProp> {
  constructor() {
    super({
      user: store.getState().user,
      chatListPanel: new ChatMessagePanel(),
      menu: new Menu()
    });

    AuthController.init().then(() => {
      AuthController.getUser();
    });
    ChatController.getChats();
  }

  override init() {
    this.child['chatList'] = new ChatList({ chats: store.getState().chats as IChat[] });
  }

  override render() {
    return this.compile(template, this.props);
  }
}

export default connect(state => ({ ...state.user }))(ChatPanelPage as typeof Block);
