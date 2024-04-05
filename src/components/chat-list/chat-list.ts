import { Block } from '@/shared/utils/block';
import { ChatItemsPanel } from '@/components/chat-items-panel';
import { InputSearch } from '@/components/input-search';

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
      chats: new ChatItemsPanel()
    });
  }

  override render() {
    return this.compile(chatListTemplate);
  }
}

const chatListTemplate = `
  {{{ inputSearch }}}
  {{{ chats }}}
`;
