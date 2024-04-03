import { Block } from '@/shared/utils/block';
import error4xxTemplate from '@/pages/error-4xx/page/template';

export class Error4xxPage extends Block {
  override render() {
    return this.compile(error4xxTemplate);
  }
}
