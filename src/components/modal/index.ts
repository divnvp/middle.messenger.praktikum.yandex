import './modal.scss';
import store, { StoreEvents } from '@/shared/storage/store';
import { AddUser } from '@/components/add-user';
import Block from '@/shared/utils/block';
import { Button } from '@/components/button';
import ChatController from '@/shared/controllers/chat.controller';
import { DeleteChat } from '@/components/delete-chat';
import { RemoveUser } from '@/components/remove-user';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  isOpened?: boolean;
}

export class Modal extends Block<IProps> {
  private openedFlag = false;

  constructor(props: IProps) {
    super({
      ...props
    });

    if (typeof props.isOpened === 'boolean') {
      this.openedFlag = props.isOpened;
    }

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProps>);
    });
  }

  protected override init() {
    this.child['button'] = new Button({
      icon: '../../icons/pencil-dots-y-icon.png',
      onClick: () => {
        this.openedFlag = !this.openedFlag;
        this.setProps({ isOpened: this.openedFlag });
      }
    });

    this.child['deleteChat'] = new DeleteChat({
      onClick: () => {
        this.setProps({ isOpened: false });
      }
    });

    this.child['removeUser'] = new RemoveUser({
      currentUsers: store.getState().currentChatUsers,
      onClick: async (e: Event) => {
        if (e) {
          e.preventDefault();

          try {
            if (store.getState().currentChat) {
              const chatId = store.getState().currentChat.id;
              const userId = (
                document.getElementById('id-user-for-remove') as unknown as { value: string }
              ).value;

              await ChatController.deleteUser(chatId, userId as unknown as number);

              this.setProps({ isOpened: false });
              ChatController.getChatUsers(chatId);
            }
          } catch (e) {
            throw new Error(String(e));
          }
        }
      }
    });

    this.child['addUser'] = new AddUser({
      onClick: async (e: Event) => {
        if (e) {
          e.preventDefault();

          try {
            if (store.getState().currentChat) {
              const chatId = store.getState().currentChat.id;
              const userId = (
                document.getElementById('id-user-for-add') as unknown as { value: string }
              ).value;

              await ChatController.addUser(chatId, userId as unknown as number);

              this.setProps({ isOpened: false });
              ChatController.getChatUsers(chatId);
            }
          } catch (e) {
            throw new Error(String(e));
          }
        }
      }
    });
  }

  protected override render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
