import { Block } from '@/shared/utils/block';
import messageItemOutTemplate from '@/components/message-item-out/message-item-out';

export class MessageItemOut extends Block {
  override render() {
    return this.compile(messageItemOutTemplate);
  }
}
