import './chat-item-block.scss';
import { Block } from '@/shared/utils/block';

export class ChatItemBlock extends Block {
  constructor() {
    super('div', {
      events: {
        click: (event: Event) => {
          if (event) {
            console.log(event);
          }
        }
      }
    });
  }

  override render() {
    return this.compile(chatItemBlock);
  }
}

const chatItemBlock = `
  <button onclick='{{this.events.click}}'>+</button>
`;
