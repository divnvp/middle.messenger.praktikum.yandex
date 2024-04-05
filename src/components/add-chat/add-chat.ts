import './add-chat.scss';
import { Block } from '@/shared/utils/block';
import { ChatController } from '@/shared/controllers/chat.controller';

const chatController = new ChatController();

export class AddChat extends Block {
  constructor() {
    super('div', {
      events: {
        click: () => {
          const chatName = document.getElementById('chat-name');
          if ((chatName as unknown as { value: string })?.value) {
            chatController.createChat({ title: (chatName as unknown as { value: string }).value });
          }
        }
      }
    });
  }

  override render() {
    return this.compile(chatMessagePanel);
  }
}

const chatMessagePanel = `
  <button onclick='{{this.events.click}}'>+</button>
`;
