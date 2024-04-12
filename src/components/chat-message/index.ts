import './chat-message.scss';
import store, { StoreEvents } from '@/shared/storage/store';
import Block from '@/shared/utils/block';
import { Button } from '@/components/button';
import { ChangeAvatar } from '@/components/change-avatar';
import { formatTime } from '@/shared/utils/custom-utils/format-time';
import { IChat } from '@/shared/models/chat.interface';
import { IMessage } from '@/shared/models/message.interface';
import { InputField } from '@/components/input-field';
import { IState } from '@/shared/models/state.interface';
import { MessageInOut } from '@/components/message-in-out';
import { Modal } from '@/components/modal';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import SocketController from '@/shared/controllers/socket.controller';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp, IState {
  currentChat: IChat;
  input: InputField;
  modal: Modal;
}

export class ChatMessage extends Block<Partial<IProps>> {
  constructor() {
    super({
      currentChat: store.getState().currentChat,
      input: new InputField({
        name: 'message',
        type: 'text'
      }),
      modal: new Modal({ isOpened: false })
    });

    if (!SocketController.doesCurrentChatExists) {
      Router.go(Routes.ChatPanel);
    }

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProps>);
    });
  }

  override init() {
    this.child['button'] = new Button({
      icon: '../../icons/arrow-right-icon.png',
      type: 'submit',
      onClick: (e: Event) => {
        e.preventDefault();

        const messageValue = (
          document.getElementById('message-value') as unknown as { value: string }
        ).value;

        if (messageValue) {
          ((this.child as { input: InputField }).input as InputField).setProps({ value: '' });
          SocketController.publish(this.props.currentChat!.id, messageValue);
        }
      }
    });
  }

  override componentDidUpdate(_: unknown, newProps: IProps): boolean {
    if (newProps.currentChat && Object.keys(newProps.currentChat).length) {
      this.child['messages'] =
        newProps.dialogs?.[newProps.currentChat?.id]
          ?.map(
            (message: IMessage) =>
              new MessageInOut({
                message: message.content,
                in: store.getState().user.id === message.user_id,
                time: formatTime(message.time)
              })
          )
          .reverse() ?? [];

      this.child['userAvatar'] = new ChangeAvatar({
        photoUrl: newProps.currentChat.avatar
      });
    } else {
      Router.go(Routes.ChatPanel);
    }

    return true;
  }

  override render() {
    return this.compile(template, this.props);
  }
}
