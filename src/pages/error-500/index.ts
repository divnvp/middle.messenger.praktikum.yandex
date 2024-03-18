import { Block } from '@/shared/utils/block';
import error500Template from '@/pages/error-500/page/template';
import { onLoad } from '@/shared/utils/load';

export class Error500Page extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(error500Template);
  }

  private onLoad() {
    onLoad('error500');
  }
}
