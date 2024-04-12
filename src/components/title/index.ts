import Block from '@/shared/utils/block';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  title: string;
}

export class Title extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
