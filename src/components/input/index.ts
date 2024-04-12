import Block from '@/shared/utils/block';
import template from './template.hbs?raw';

interface TProps {
  className?: string;
  hint?: string;
  type: string;
  name: string;
  value?: string;
  autocomplete?: string;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => NonNullable<unknown>;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => NonNullable<unknown>;
}

export class Input extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        focus: props.onFocus,
        blur: props.onBlur,
        change: props.onChange,
        input: props.onInput
      }
    });
  }

  override componentDidUpdate(): boolean {
    return true;
  }

  override render() {
    return this.compile(template, this.props);
  }
}
