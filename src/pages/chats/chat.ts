import { Block } from '@/shared/utils/block';
import { ChatController } from '@/shared/controllers/chat.controller';
import { ChatList } from '@/components/chat-list';
import { ChatPanel } from '@/components/chat-panel';
import chatTemplate from '@/pages/chats/template';
import { Menu } from '@/components/menu';

const chatController = new ChatController();
await chatController.getChats();

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
    });
  }

  override render() {
    return this.compile(chatTemplate);
  }
}
