import Block from '../../shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  message: string;
  in: boolean;
  time?: string;
}

export class MessageInOut extends Block {
  constructor(props: IProps) {
    super({
      ...props
    });
  }

  override init() {}

  override render() {
    return this.compile(template, this.props);
  }
}
