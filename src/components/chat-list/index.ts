import { Block } from '@/shared/utils/block';
import chatListTemplate from '@/components/chat-list/chat-list';

export class ChatList extends Block {
  override render() {
    return this.compile(chatListTemplate);
  }
}
