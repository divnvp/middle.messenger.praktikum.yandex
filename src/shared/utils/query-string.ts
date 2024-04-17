import { isArrayOrObject } from './custom-utils/is-array-or-object';
import { isPlainObject } from './custom-utils/is-plain-object';
import { PlainObjectOrArray } from '../models/types';

export function queryStringify(data: Record<string, unknown>) {
  if (!isPlainObject(data)) {
    throw new Error();
  }

  return getParams(data)
    .map(arr => arr.join('='))
    .join('&');
}

function getParams(data: PlainObjectOrArray, parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}
