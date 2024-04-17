import './chat-item.scss';
import store, { StoreEvents } from '../../shared/storage/store';
import Block from '../../shared/utils/block';
import { ChangeAvatar } from '../change-avatar';
import ChatController from '../../shared/controllers/chat.controller';
import { formatTime } from '../../shared/utils/custom-utils/format-time';
import { IChat } from '../../shared/models/chat.interface';
import Router from '../../shared/router/router';
import { Routes } from '../../shared/const/routes';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  chat?: IChat;
  message?: TProp;
  events?: TProp;
}

export class ChatItem extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (e) {
            ChatController.selectChat(this.props.chat as IChat);
            ChatController.getChatUsers(this.props.chat!.id);
            Router.go(Routes.Messenger);
          }
        }
      },
      message: {
        time: formatTime(props.chat?.last_message?.time)
      }
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProps>);
    });
  }

  override init() {
    this.child['userAvatar'] = new ChangeAvatar({
      photoUrl: this.props.chat?.avatar ?? ''
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
