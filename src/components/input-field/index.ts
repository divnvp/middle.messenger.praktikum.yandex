import Block from '../../shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  id?: string;
  className?: string;
  title?: string;
  type?: string;
  name?: string;
  value?: string;
  onBlur?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export class InputField extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange
      }
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
