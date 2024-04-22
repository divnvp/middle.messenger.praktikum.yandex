import Block from '../../shared/utils/block';
import { Button } from '../button';
import ChatController from '../../shared/controllers/chat.controller';
import store from '../../shared/storage/store';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProp extends TProp {
  onClick?: (e: Event) => void;
  events?: Record<string, unknown>;
}
export class DeleteChat extends Block<IProp> {
  constructor(props: IProp) {
    super({
      ...props
    });
  }

  protected override init() {
    this.child['button'] = new Button({
      text: 'Удалить чат',
      onClick: (e: Event) => {
        if (e) {
          e.preventDefault();
          ChatController.delete(store.getState().currentChat.id);
        }
      }
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
