import { Block } from '@/shared/utils/block';
import error500Template from '@/pages/error-500/page/template';

export class Error500Page extends Block {
  override render() {
    return this.compile(error500Template);
  }
}
