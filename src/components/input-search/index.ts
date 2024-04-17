import Block from '../../shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProp extends TProp {
  events?: TProp;
  onChange?: (e: Event) => void;
}

export class InputSearch extends Block<IProp> {
  constructor(props: IProp) {
    super({
      events: {
        change: props.onChange
      }
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
