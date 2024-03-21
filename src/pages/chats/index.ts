import { Block } from '@/shared/utils/block';
import chatTemplate from '@/pages/chats/page/template';

export class ChatPage extends Block {
  override render() {
    return this.compile(chatTemplate);
  }
}
