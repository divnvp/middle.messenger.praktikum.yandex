import { Block } from '@/shared/utils/block';
import chatTemplate from '@/pages/chats/page/template';
import { onLoad } from '@/shared/utils/load';

export class ChatPage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(chatTemplate);
  }

  private onLoad() {
    onLoad('chat');
  }
}
