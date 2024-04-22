import { isPlainObject } from './is-plain-object';
import { PlainObjectOrArray } from '../../models/types';

export function isArrayOrObject(value: unknown): value is PlainObjectOrArray {
  return isPlainObject(value) || Array.isArray(value);
}
