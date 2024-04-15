import { isPlainObject } from '@/shared/utils/custom-utils/is-plain-object';
import { PlainObjectOrArray } from '@/shared/models/types';

export function isArrayOrObject(value: unknown): value is PlainObjectOrArray {
  return isPlainObject(value) || Array.isArray(value);
}
