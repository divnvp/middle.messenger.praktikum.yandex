import './error-4xx.scss';
import { Block } from '@/shared/utils/block';
import error4xxTemplate from '@/pages/error-4xx/template';
import { Link } from '@/components/link';
import { Routes } from '@/shared/const/routes';

export class Error4xxPage extends Block {
  constructor() {
    super('div', {
      link: new Link('div', { page: Routes.Back, text: 'Назад' })
    });
  }

  override render() {
    return this.compile(error4xxTemplate);
  }
}
