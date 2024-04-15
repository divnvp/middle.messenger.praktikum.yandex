import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import store, { StoreEvents } from '@/shared/storage/store';
import Block from '@/shared/utils/block';
import { Button } from '@/components/button';
import { getFormProps } from '@/shared/utils/form-props';
import { InputField } from '@/components/input-field';
import { IUser } from '@/shared/models/user.interface';
import { profileFields } from '@/shared/const/page-data';
import { setValuesFields } from '@/shared/utils/set-values-fields';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';
import UserController from '@/shared/controllers/user.controller';
import { UserPhoto } from '@/components/user-photo';

interface IProps extends TProp {
  user: IUser;
  events: TProp;
  isLoading?: boolean;
  userAvatar?: UserPhoto;
}

export class ProfileFields extends Block<IProps> {
  constructor() {
    super({
      user: store.getState().user as IUser,
      events: {
        submit: async (event: Event) => {
          if (event) {
            event.preventDefault();

            const data = getFormProps(event.target as HTMLFormElement);

            if (onValidateSubmit(event)) {
              await UserController.update(data);
            }
          }
        }
      }
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProps>);
    });
  }

  override init() {
    this.child['userAvatar'] = new UserPhoto({
      update: true
    });
    this.child['button'] = new Button({
      type: 'submit',
      text: 'Сохранить'
    });
    this.child['fields'] = profileFields.map(
      values =>
        new InputField({
          ...values,
          value: (this.props as unknown as { user: { name: string } }).user.name ?? '',
          onBlur: onValidate
        })
    );
  }

  override componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    setValuesFields(this.child, oldProps, newProps);

    return true;
  }

  override render() {
    return this.compile(template, this.props);
  }
}
