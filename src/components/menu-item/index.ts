import Block from '../../shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProp extends TProp {
  name: string;
  onClick?: (e: Event) => void;
  icon: string;
  events?: TProp;
}
export class MenuButton extends Block<IProp> {
  constructor(props: IProp) {
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
