import { isPlainObject } from '@/shared/utils/custom-utils/is-plain-object';
import { PlainObject } from '@/shared/models/plain-object.type';

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || Array.isArray(value);
}
