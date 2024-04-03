import { Block } from '@/shared/utils/block';
import chatMessageTemplate from '@/components/chat-message/chat-message';

export class ChatMessage extends Block {
  override render() {
    return this.compile(chatMessageTemplate);
  }
}
