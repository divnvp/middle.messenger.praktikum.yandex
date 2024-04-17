import './add-chat.scss';
import Block from '../../shared/utils/block';
import { Button } from '../button';
import ChatController from '../../shared/controllers/chat.controller';
import { InputField } from '../input-field';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  input: InputField;
  button?: Button;
}

export class AddChatButton extends Block<IProps> {
  constructor() {
    super({
      input: new InputField({
        id: 'chat-name',
        name: 'chat',
        placeholder: 'Название чата'
      })
    });
  }

  protected override init() {
    this.child['button'] = new Button({
      type: 'submit',
      text: '+',
      onClick: async (e: Event) => {
        if (e) {
          e.preventDefault();
          const chatName = (document.getElementById('chat-name') as unknown as { value: string })
            ?.value;
          if (chatName) {
            await ChatController.create(chatName);
          }
        }
      }
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
