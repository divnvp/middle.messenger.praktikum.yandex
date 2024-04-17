import './text.scss';
import Block from '../../shared/utils/block';
import textTemplate from '../../components/text/template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  text: string;
}

export class Text extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  override render() {
    return this.compile(textTemplate, this.props);
  }
}
