import './error-500.scss';
import { Block } from '@/shared/utils/block';
import error500Template from '@/pages/error-500/template';
import { Link } from '@/components/link';
import { Routes } from '@/shared/const/routes';

export class Error500Page extends Block {
  constructor() {
    super('div', {
      link: new Link('div', { page: Routes.Back, text: 'Назад' })
    });
  }

  override render() {
    return this.compile(error500Template);
  }
}
