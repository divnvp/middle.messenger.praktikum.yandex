import { Block } from '@/shared/utils/block';
import titleTemplate from '@/components/title/title';

export class Title extends Block {
  override render() {
    return this.compile(titleTemplate);
  }
}
