import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import store, { StoreEvents } from '@/shared/storage/store';
import { Block } from '@/shared/utils/block';
import { ButtonWithIcon } from '@/components/button-icon';
import chatMessageTemplate from '@/components/chat-message/chat-message';
import { IChat } from '@/shared/models/chat.interface';
import { MessageItemIn } from '@/components/message-item-in';
import { MessageItemOut } from '@/components/message-item-out';

export class ChatMessage extends Block {
  constructor(chat?: IChat) {
    super('div', {
      events: {
        submit: onValidateSubmit,
        blur: {
          event: onValidate,
          querySelector: 'input'
        }
      },
      name: chat?.title,
      messageItem: [
        new MessageItemIn('div', {
          message: 'Привет!',
          time: '11:02'
        }),
        new MessageItemOut('div', {
          message: 'Привет!',
          time: '11:02'
        })
      ],
      button: new ButtonWithIcon('div', {
        type: 'submit',
        icon: '../../icons/arrow-right-icon.png'
      })
    });

    store.on(StoreEvents.Updated, () => this.setProps(store.getState()));
  }

  override render() {
    return this.compile(chatMessageTemplate);
  }
}
