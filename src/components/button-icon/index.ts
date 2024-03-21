import { Block } from '@/shared/utils/block';
import buttonWithIconTemplate from '@/components/button-icon/button-icon';

export class ButtonWithIcon extends Block {
  override render() {
    return this.compile(buttonWithIconTemplate);
  }
}
