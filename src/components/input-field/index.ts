import { Block } from '@/shared/utils/block';
import inputFieldTemplate from '@/components/input-field/input-field';

export class InputField extends Block {
  override render() {
    return this.compile(inputFieldTemplate);
  }
}
