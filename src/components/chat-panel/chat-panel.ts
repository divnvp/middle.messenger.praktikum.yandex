import './chat-panel.scss';
import store, { StoreEvents } from '@/shared/storage/store';
import { AddChat } from '@/components/add-chat';
import { Block } from '@/shared/utils/block';
import { ChatMessage } from '@/components/chat-message';
import { InputField } from '@/components/input-field';

store.on(StoreEvents.Updated, () => {
  store.getState();
});

export class ChatPanel extends Block {
  constructor() {
    super('div', {
      attr: {
        class: 'chat-message'
      },
      currentChat: store.getState().currentChat,
      addChat: new AddChat(),
      input: new InputField('div', {
        placeholder: 'Название чата',
        id: 'chat-name'
      }),
      chat: new ChatMessage()
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  override render() {
    return this.compile(chatMessagePanel);
  }
}

const chatMessagePanel = `
{{#if currentChat}}
  {{{ chat }}}
{{else}}
<div class="chat-message-panel">
  <p>Выберите чат из списка или создайте свой</p>
  
  <div class="chat-message-panel__input">
    {{{ input }}}
    {{{ addChat }}}
  </div>
</div>
{{/if}}
`;
