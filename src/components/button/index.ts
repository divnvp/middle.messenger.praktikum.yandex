import { Block } from '@/shared/utils/block';
import buttonTemplate from '@/components/button/button';

export class Button extends Block {
  override render() {
    return this.compile(buttonTemplate);
  }
}
