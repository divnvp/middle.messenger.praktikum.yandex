import { Block } from '@/shared/utils/block';
import chatItemTemplate from '@/components/chat-item/chat-item';

export class ChatItem extends Block {
  override render() {
    return this.compile(chatItemTemplate);
  }
}
