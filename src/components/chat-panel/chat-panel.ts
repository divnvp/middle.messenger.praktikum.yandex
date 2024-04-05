import './chat-panel.scss';
import { AddChat } from '@/components/add-chat';
import { Block } from '@/shared/utils/block';
import { ChatController } from '@/shared/controllers/chat.controller';
import { InputField } from '@/components/input-field';

export class ChatPanel extends Block {
  private readonly chatController = new ChatController();

  constructor() {
    super('div', {
      attr: {
        class: 'chat-message'
      },
      addChat: new AddChat(),
      input: new InputField('div', {
        placeholder: 'Название чата',
        id: 'chat-name'
      })
    });

    this.chatController.getChats();
  }

  override render() {
    return this.compile(chatMessagePanel);
  }
}

const chatMessagePanel = `
<div class="chat-message-panel">
  <p>Выберите чат из списка или создайте свой</p>
  
  <div class="chat-message-panel__input">
    {{{ input }}}
    {{{ addChat }}}
  </div>
</div>
`;
