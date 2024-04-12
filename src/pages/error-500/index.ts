import './error-500.scss';
import Block from '@/shared/utils/block';
import error500Template from '@/pages/error-500/template.hbs?raw';
import { Link } from '@/components/link';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  link: Link;
}

export class Error500Page extends Block<IProps> {
  constructor() {
    super({
      link: new Link({
        text: 'Назад',
        onClick: () => {
          Router.go(Routes.ChatPanel);
        }
      })
    });
  }

  override render() {
    return this.compile(error500Template);
  }
}
