import { Block } from '@/shared/utils/block';
import { ChatList } from '@/components/chat-list';
import { ChatPanel } from '@/components/chat-panel';
import chatTemplate from '@/pages/chats/template';
import { Menu } from '@/components/menu';

export class ChatPage extends Block {
  constructor() {
    super('div', {
      attr: {
        class: 'chat-page'
      },
      menu: new Menu('div', {
        attr: {
          class: 'col menu'
        }
      }),
      chatList: new ChatList(),
      chatMessage: new ChatPanel()
      // chatMessage: new ChatMessage('form', {
      //   attr: {
      //     class: 'chat-message'
      //   },
      //   events: {
      //     submit: onValidateSubmit,
      //     blur: {
      //       event: onValidate,
      //       querySelector: 'input'
      //     }
      //   },
      //   messageItem: [
      //     new MessageItemIn('div', {
      //       message: 'Привет!',
      //       time: '11:02'
      //     }),
      //     new MessageItemOut('div', {
      //       message: 'Привет!',
      //       time: '11:02'
      //     })
      //   ],
      //   button: new ButtonWithIcon('div', {
      //     type: 'submit',
      //     icon: '../../icons/arrow-right-icon.png'
      //   })
      // })
    });
  }

  override render() {
    return this.compile(chatTemplate);
  }
}
