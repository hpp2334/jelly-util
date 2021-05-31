# Tree Map

"Tree map" is a tiny package providing tree data structure. For each node, edge to child is labeled by key, and child node can be obtained by key on the edge. Simple usage is shown following. For more usage, test file `__tests__/tree-node.js` is a reference.

```ts
const { TreeMap } = require('.');

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
    console.log(`${treepath} is a ${file ? "file" : "directory"}.${!file ? '' : ` contents: ${contents}`}`);
  }
)

// Log:
// /user is a directory.
// /user/documents is a directory.
// /user/documents/a.txt is a file. contents: Hello world
```

## Install

```
npm i @jelly-util/tree-map
```

## Concept

### Tree path

"tree path" is a string or string array like unix path. For example, `a/b/c` is equivalant to `['a', 'b', 'c']`, representing `--a--(*)--b--(*)--c--`, where `(*)` is node in tree. Notice that if symbol `/` is wanted in string tree path, it should be writen as `\\/`. For example, `a\\//b` is equivalant to `['a/', 'b']`.

## API

See [docs/README.md](docs/README.md)