import Block from '../../shared/utils/block';
import { Button } from '../button';
import { InputField } from '../input-field';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  onClick?: (e: Event) => void;
  events?: Record<string, unknown>;
  input?: InputField;
}
export class AddUser extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      input: new InputField({
        title: 'ИД пользователя',
        id: 'id-user-for-add'
      })
    });
  }

  protected override init() {
    this.child['button'] = new Button({
      text: '+',
      onClick: this.props.onClick
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
