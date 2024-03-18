import { Block } from '@/shared/utils/block';
import error4xxTemplate from '@/pages/error-4xx/page/template';
import { onLoad } from '@/shared/utils/load';

export class Error4xxPage extends Block {
  override addEvents() {
    super.addEvents();
    document.addEventListener('DOMContentLoaded', this.onLoad);
  }

  override removeEvents() {
    super.removeEvents();
    document.removeEventListener('DOMContentLoaded', this.onLoad);
  }

  override render() {
    return this.compile(error4xxTemplate);
  }

  private onLoad() {
    onLoad('error4xx');
  }
}
