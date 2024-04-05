import './chat-items-panel.scss';
import { Block } from '@/shared/utils/block';
import { ChatController } from '@/shared/controllers/chat.controller';
import { ChatItem } from '@/components/chat-item';

const chatController = new ChatController();
await chatController.init();

export class ChatItemsPanel extends Block {
  constructor() {
    super('div', {
      chats: chatController.getChatsFromStore()?.map(
        chat =>
          new ChatItem('div', {
            name: chat.title,
            unread: chat.unread_count,
            message: chat.last_message ?? ''
          })
      )
    });
  }

  override render() {
    return this.compile(chatItemTemplate);
  }
}

const chatItemTemplate = `
  {{{ chats }}}
`;
