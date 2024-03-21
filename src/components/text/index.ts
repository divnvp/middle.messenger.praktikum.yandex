import { Block } from '@/shared/utils/block';
import textTemplate from '@/components/text/text';

export class Text extends Block {
  override render() {
    return this.compile(textTemplate);
  }
}
