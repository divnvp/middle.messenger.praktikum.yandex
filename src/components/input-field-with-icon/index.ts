import Block from '@/shared/utils/block';
import inputWithIconFieldTemplate from '@/components/input-field-with-icon/template.hbs?raw';

interface IProps {
  id: string;
  className?: string;
  title?: string;
  type: string;
  name: string;
  value?: string;
  icon?: string;
  onBlur?: (e: Event) => void;
}

export class InputWithIconField extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur
      }
    });
  }

  override componentDidUpdate(): boolean {
    return true;
  }

  override render() {
    return this.compile(inputWithIconFieldTemplate, this.props);
  }
}
