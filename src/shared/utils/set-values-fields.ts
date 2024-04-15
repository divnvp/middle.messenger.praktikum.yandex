import { BlockOrBlockArray } from '@/shared/models/types';
import { Indexed } from '@/shared/models/indexed.type';
import { InputField } from '@/components/input-field';
import isEqual from '@/shared/utils/custom-utils/is-equals';
import { profileFields } from '@/shared/const/page-data';

export function setValuesFields(
  children: Record<string, BlockOrBlockArray>,
  oldProps: Indexed,
  newProps: Indexed
) {
  (children['fields'] as InputField[]).forEach((el: InputField, i: number) => {
    if (!isEqual(oldProps as unknown as Indexed, newProps as unknown as Indexed)) {
      const propName = (profileFields[i] as unknown as { name: string }).name;
      el.setProps({
        value: (newProps['user'] as unknown as Record<string, string>)[propName] as string
      });
    }
  });
}
