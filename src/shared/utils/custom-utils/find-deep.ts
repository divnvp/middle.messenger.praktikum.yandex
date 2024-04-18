export const findDeep = (object: unknown, path = '') =>
  path
    .split('.')
    .reduce((o, x) => (o == undefined ? o : (o as Record<string, unknown>)[x]), object);
