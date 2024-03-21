import { Block } from '@/shared/utils/block';
import messageItemTemplate from '@/components/message-item-in/message-item-in';

export class MessageItemIn extends Block {
  override render() {
    return this.compile(messageItemTemplate);
  }
}
