import { Block } from '@/shared/utils/block';
import inputSearchTemplate from '@/components/input-search/input-search';

export class InputSearch extends Block {
  override render() {
    return this.compile(inputSearchTemplate);
  }
}
