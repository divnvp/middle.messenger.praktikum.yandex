import { Block } from '@/shared/utils/block';
import inputWithIconFieldTemplate from '@/components/input-field-with-icon/input-field-with-icon';

export class InputWithIconField extends Block {
  override render() {
    return this.compile(inputWithIconFieldTemplate);
  }
}
