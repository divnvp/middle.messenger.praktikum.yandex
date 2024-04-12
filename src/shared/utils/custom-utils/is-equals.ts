import { isArrayOrObject } from '@/shared/utils/custom-utils/is-array-or-object';
import { PlainObject } from '@/shared/models/plain-object.type';

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const tail = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(tail)) {
      if (isEqual(value as PlainObject, tail as PlainObject)) {
        continue;
      }
      return false;
    }

    if (value !== tail) {
      return false;
    }
  }

  return true;
}

export default isEqual;
