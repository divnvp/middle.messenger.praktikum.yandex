import './button.scss';
import Block from '../../shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  className?: string;
  text?: string;
  icon?: string;
  type?: string;
  onClick?: (e: Event) => void;
  child?: never;
}

export class Button extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
