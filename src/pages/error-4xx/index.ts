import './error-4xx.scss';
import Block from '../../shared/utils/block';
import { Link } from '../../components/link';
import Router from '../../shared/router/router';
import { Routes } from '../../shared/const/routes';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  link: Link;
}

export class Error4xxPage extends Block<IProps> {
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
    return this.compile(template);
  }
}
