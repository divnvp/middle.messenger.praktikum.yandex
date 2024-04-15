import './chat-panel.scss';
import store, { StoreEvents } from '@/shared/storage/store';
import { AddChatButton } from '@/components/add-chat';
import Block from '@/shared/utils/block';
import { IUser } from '@/shared/models/user.interface';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  user: IUser;
  addChat: AddChatButton;
}

class ChatMessagePanel extends Block<IProps> {
  constructor() {
    super({
      user: store.getState().user,
      addChat: new AddChatButton()
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProps>);
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}

export default ChatMessagePanel;
