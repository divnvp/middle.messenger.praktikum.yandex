import { Block } from '@/shared/utils/block';
import { ChatItemsPanel } from '@/components/chat-items-panel';
import { InputSearch } from '@/components/input-search';
// import store from '@/shared/storage/store';

export class ChatList extends Block {
  constructor() {
    super('div', {
      attr: {
        class: 'chat-list'
      },
      inputSearch: new InputSearch('div', {
        attr: {
          class: 'input-search'
        }
      }),
      chatItems: new ChatItemsPanel()
    });
  }

  // override init() {
  //   this.child['chatItems'] = store.getState().chats?.map(
  //     chat =>
  //       new ChatItem('div', {
  //         name: chat.title
  //       })
  //   );
  // }

  override render() {
    return this.compile(chatListTemplate);
  }
}

const chatListTemplate = `
  {{{ inputSearch }}}
  {{{ chatItems }}}
`;
