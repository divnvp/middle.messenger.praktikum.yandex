import { Indexed } from '../../models/indexed.type';
import { IndexedOrUnknown } from '../../models/types';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if ((rhs[p] as { constructor: unknown }).constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(object: IndexedOrUnknown, path: string, value: unknown): IndexedOrUnknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc
    }),
    value as never
  );
  return merge(object as Indexed, result);
}

export default set;
