import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { ButtonWithIcon } from '@/components/button-icon';
import { ChatItem } from '@/components/chat-item';
import { ChatList } from '@/components/chat-list';
import { ChatMessage } from '@/components/chat-message';
import { ChatPage } from '@/pages/chats';
import { InputSearch } from '@/components/input-search';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { MessageItemIn } from '@/components/message-item-in';
import { MessageItemOut } from '@/components/message-item-out';
import { render } from '@/shared/utils/render';

const chatPage = new ChatPage('div', {
  attr: {
    class: 'chat-page'
  },
  menu: new Menu('div', {
    attr: {
      class: 'col menu'
    }
  }),
  chatList: new ChatList('div', {
    attr: {
      class: 'chat-list'
    },
    inputSearch: new InputSearch('div', {
      attr: {
        class: 'input-search'
      }
    }),
    chatItems: [
      new ChatItem('div', {
        name: 'Андрей',
        message: 'Изображение',
        unread: '2'
      }),
      new ChatItem('div', { name: 'Киноклуб', message: 'Go на свалку!' }),
      new ChatItem('div', { name: 'Илья', message: 'А у кого ключи от сарая?', unread: '4' }),
      new ChatItem('div', { name: 'Илья', message: 'А у кого ключи от сарая?', unread: '2' }),
      new ChatItem('div', { name: 'тет-а-теты', message: 'А у кого ключи от сарая?' }),
      new Link('div', { url: '/', text: 'Назад' })
    ]
  }),
  chatMessage: new ChatMessage('form', {
    attr: {
      class: 'chat-message'
    },
    events: {
      submit: onValidateSubmit,
      blur: {
        event: onValidate,
        querySelector: 'input'
      }
    },
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
  })
});

render('#app', chatPage);
