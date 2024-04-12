import store, { StoreEvents } from '@/shared/storage/store';
import Block from '@/shared/utils/block';
import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProp extends TProp {
  onClick?: (e: Event) => void;
  events?: Record<string, unknown>;
  input?: InputField;
}
export class RemoveUser extends Block<IProp> {
  constructor(props: IProp) {
    super({
      ...props,
      input: new InputField({
        title: 'ИД пользователя',
        id: 'id-user-for-remove'
      })
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(props);
    });
  }

  protected override init() {
    this.child['button'] = new Button({
      text: '-',
      onClick: this.props.onClick
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
