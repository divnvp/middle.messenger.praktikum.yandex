import './style.scss';
import store, { StoreEvents } from '../../shared/storage/store';
import Block from '../../shared/utils/block';
import { ChangeAvatar } from '../change-avatar';
import { InputField } from '../input-field';
import { IUser } from '../../shared/models/user.interface';
import { readFile } from '../../shared/utils/file-reader';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  user?: IUser;
  update?: boolean;
  changeAvatar?: ChangeAvatar;
  input?: InputField;
}

export class UserPhoto extends Block<IProps> {
  constructor(props: IProps) {
    super({
      user: store.getState().user,
      ...props
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProps>);
    });
  }

  override init() {
    this.child['changeAvatar'] = new ChangeAvatar({
      photoUrl: (this.props as { user: { avatar?: string } }).user?.avatar ?? undefined
    });

    this.child['input'] = new InputField({
      type: 'file',
      name: 'avatar',
      onChange: (e: Event) => {
        const element = e?.target as HTMLInputElement;
        if (element?.files && element.files.length) {
          readFile(element);
          this.setProps(store.getState().user as unknown as Partial<IProps>);
        }
      }
    });
  }

  override componentDidUpdate(): boolean {
    this.child['changeAvatar'] = new ChangeAvatar({
      photoUrl: (this.props as { user: { avatar?: string } }).user?.avatar ?? undefined
    });
    return true;
  }

  override render() {
    return this.compile(template, this.props);
  }
}
