import './add-chat.scss';
import { Block } from '@/shared/utils/block';
import { ChatApi } from '@/shared/api/chat-api';

const chatAPI = new ChatApi();

export class AddChat extends Block {
  constructor() {
    super('div', {
      events: {
        click: () => {
          const chatName = document.getElementById('chat-name');
          if ((chatName as unknown as { value: string })?.value) {
            chatAPI.create({
              title: (chatName as unknown as { value: string }).value
            });
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
