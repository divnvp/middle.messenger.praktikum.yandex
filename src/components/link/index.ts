import './link.scss';
import Block from '@/shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  url?: string;
  text: string;
  onClick?: () => void;
  events?: TProp;
}

export class Link extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: props['onClick']
      }
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
