
const { TreeMap, parseTreePathString } = require('../');

/** @type {TreeMap} */
let tm;

beforeEach(() => {
  tm = new TreeMap();
});

test('access, getValue, hasValue, deleteValue', async () => {
  const root = tm.root;

  const c = root.access([0, 'b', 'c'], true);
  expect(c.hasValue()).toBe(false);
  
  c.setValue(1);
  expect(c.getValue()).toBe(1);

  expect(c.access('c/d/e', false)).toBe(undefined);
  const e = c.access('/c/d/e', true);

  expect(c.getValue()).toBe(1);
  expect(root.access([0, 'b', 'c'], false).getValue()).toBe(1);
  expect(e.hasValue()).toBe(false);

  e.setValue(undefined);
  expect(e.hasValue()).toBe(true);
  expect(e.getValue()).toBe(undefined);

  e.deleteValue();
  expect(e.hasValue()).toBe(false);
  expect(e.getValue()).toBe(undefined);
  
  expect(c.getValue()).toBe(1);

  e.setValue(2);
  c.deleteValue();
  expect(c.hasValue()).toBe(false);
  expect(e.hasValue()).toBe(true);
});

test('removeAll', async () => {
  const root = tm.root;

  root.access('/a/b/c/d', true);
  root.access('/a/b/c/e', true);

  const b = root.access('/a/b');
  b.setValue(undefined)

  b.removeAll();
  expect(b.parent.getChild(b.parentKey)).toBe(b);
  expect(b.children).toBe(null);
  expect(b.hasValue()).toBe(true);

  b.removeAll(true);
  expect(b.parent.getChild(b.parentKey)).toBe(undefined);
  expect(b.children).toBe(null);
  expect(b.hasValue()).toBe(false);
});

test('node & paths same ref', async () => {
  const root = tm.root;
  let [a, b, c, d, e] = [
    root.access('/a', true),
    root.access('/a/b', true),
    root.access('/a/b/c', true),
    root.access('/a/b/c/d', true),
    root.access('/a/b/c/e', true),
  ]

  expect(b.access('/c/d')).toBe(d);
  expect(d.parent.parent).toBe(b);
  expect(b.access('/c/e')).toBe(e);
  expect(c.access('e')).toBe(e);
  expect(e.parent).toBe(c);
  expect(a.access('/b/c')).toBe(c);
  expect(c.parent.parent).toBe(a);
});

test('visit', async () => {
  const list = [
    '/a',
    '/a/b',
    '/a/b/c',
    '/a/b/c/d',
    '/a/b/c/d/e',
    '/a/b/c/f',
    '/a/b/c/f/g',
  ];

  const root = tm.root;
  let tot = 0;
  [
    parseTreePathString('/a/b/c/d/e'),
    parseTreePathString('/a/b/c/f/g')
  ].forEach(p => {
    root.visit(
      p,
      (treepath, node) => {
        if (!node.hasValue()) {
          node.setValue(++tot)
        }
        const i = node.getValue();
        expect(treepath).toBe(list[i - 1]);
      },
      false,
      true
    );
  });

  const expF = s => expect(root.access(s).getValue());
  expF('/a').toBe(1);
  expF('/a/b').toBe(2);
  expF('/a/b/c').toBe(3);
  expF('/a/b/c/d').toBe(4);
  expF('/a/b/c/d/e').toBe(5);
  expF('/a/b/c/f').toBe(6);
  expF('/a/b/c/f/g').toBe(7);
});

test('simple fs', async () => {
  const treeMap = new TreeMap();
  const root = treeMap.root;

  const docNode = root.access('/user/documents', true);
  docNode.getChild('a.txt', true).setValue({
    file: true,
    contents: 'Hello world',
  });
  docNode.getChild('b.txt', true).setValue({
    file: true,
    contents: 'Bye~',
  });

  root.visit(
    '/user/documents/a.txt',
    (treepath, node) => {
      const { file, contents } = node.hasValue() ? node.getValue() : {};

      const expIsFile = /\.txt$/.test(treepath);
      expect(!!file).toBe(expIsFile);
    }
  )
})