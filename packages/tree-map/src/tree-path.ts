import { TreePathNS } from "./type";

/** @ignore */
export const appendPath = (base: string, appended: string) => {
  if (appended.startsWith('/')) {
    appended = appended.slice(0);
  }
  if (appended.endsWith('/')) {
    appended = appended.slice(0, -1);
  }
  return base.endsWith('/') ? base + appended : base + '/' + appended;
}

/** @ignore */
export const validateTreePathString = (treepath: TreePathNS.TreePath): boolean => {
  const normalized = treepath.toString();
  const invalid = normalized.indexOf('//') >= 0 || normalized === '' || normalized === '/' || normalized.endsWith('\\');
  return !invalid;
}

/** @ignore */
export const parseTreePathString = (treepath: TreePathNS.TreePath): string[] => {
  const valid = validateTreePathString(treepath);
  if (!valid) {
    throw Error(`"${treepath}" is invalid.`);
  }

  const normalized = treepath.toString();

  let ed = normalized.length;
  ed = normalized[ed - 1] === '/' ? ed - 1 : ed;
  let be = normalized[0] === '/' ? 1 : 0;

  let escape = 0;
  let ch = '';
  let item = '';
  const list = [];
  while (be < ed) {
    while (be < ed) {
      ch = normalized[be];

      if (escape === 0 && ch === '\\') {
        escape = 2;
      }
      if (!escape && ch === '/') {
        break;
      }
      if (escape < 2) {
        item += ch;
      }
      be++;
      escape = escape === 0 ? 0 : escape - 1;
    }
    list.push(item);
    item = '';
    be++;
  }
  return list;
}
