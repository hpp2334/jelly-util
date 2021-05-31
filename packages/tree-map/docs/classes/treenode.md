[@jelly-util/tree-map](../README.md) / TreeNode

# Class: TreeNode<V\>

## Type parameters

| Name |
| :------ |
| `V` |

## Table of contents

### Accessors

- [children](treenode.md#children)
- [parent](treenode.md#parent)
- [parentKey](treenode.md#parentkey)
- [treepath](treenode.md#treepath)

### Methods

- [access](treenode.md#access)
- [deleteValue](treenode.md#deletevalue)
- [getChild](treenode.md#getchild)
- [getValue](treenode.md#getvalue)
- [hasValue](treenode.md#hasvalue)
- [removeAll](treenode.md#removeall)
- [setValue](treenode.md#setvalue)
- [visit](treenode.md#visit)

## Accessors

### children

• get **children**(): ``null`` \| *Map*<string, [*TreeNode*](treenode.md)<V\>\>

get map about Map<childkey, childNode>

**Returns:** ``null`` \| *Map*<string, [*TreeNode*](treenode.md)<V\>\>

___

### parent

• get **parent**(): ``null`` \| [*TreeNode*](treenode.md)<V\>

get parent node

**Returns:** ``null`` \| [*TreeNode*](treenode.md)<V\>

___

### parentKey

• get **parentKey**(): ``null`` \| *string*

get key between this node and its parent

**Returns:** ``null`` \| *string*

___

### treepath

• get **treepath**(): *string*

get treepath from root to this node

**Returns:** *string*

## Methods

### access

▸ **access**<AC\>(`treepath`: [*TreePath*](../modules/treepathns.md#treepath) \| [*TreePath*](../modules/treepathns.md#treepath)[], `autoCreate?`: AC): AC *extends* ``true`` ? [*TreeNode*](treenode.md)<V\> : *undefined* \| [*TreeNode*](treenode.md)<V\>

get node by treepath

#### Type parameters

| Name | Type |
| :------ | :------ |
| `AC` | *boolean* |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treepath` | [*TreePath*](../modules/treepathns.md#treepath) \| [*TreePath*](../modules/treepathns.md#treepath)[] | treepath |
| `autoCreate?` | AC | auto create node when not exists |

**Returns:** AC *extends* ``true`` ? [*TreeNode*](treenode.md)<V\> : *undefined* \| [*TreeNode*](treenode.md)<V\>

___

### deleteValue

▸ **deleteValue**(): *void*

Remove value in this tree node

**Returns:** *void*

___

### getChild

▸ **getChild**<AC\>(`key`: *string*, `autoCreate`: AC): AC *extends* ``true`` ? [*TreeNode*](treenode.md)<V\> : *undefined* \| [*TreeNode*](treenode.md)<V\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `AC` | *boolean* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |
| `autoCreate` | AC |

**Returns:** AC *extends* ``true`` ? [*TreeNode*](treenode.md)<V\> : *undefined* \| [*TreeNode*](treenode.md)<V\>

___

### getValue

▸ **getValue**(): *undefined* \| V

**Returns:** *undefined* \| V

___

### hasValue

▸ **hasValue**(): *boolean*

**Returns:** *boolean*

___

### removeAll

▸ **removeAll**(`inclusive?`: *boolean*): *void*

Remove node in sub tree. NOTICE: this method only delete value for this node, and unlink between this node and its parent and children.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inclusive?` | *boolean* | include itself or not |

**Returns:** *void*

___

### setValue

▸ **setValue**(`nextValue`: V): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextValue` | V |

**Returns:** *void*

___

### visit

▸ **visit**<AC\>(`treepath`: [*TreePath*](../modules/treepathns.md#treepath) \| [*TreePath*](../modules/treepathns.md#treepath)[], `onVisit?`: (`treepath`: *string*, `node`: [*TreeNode*](treenode.md)<V\>) => *void*, `inclusive?`: *boolean*, `autoCreate?`: AC): AC *extends* ``true`` ? [*TreeNode*](treenode.md)<V\> : *undefined* \| [*TreeNode*](treenode.md)<V\>

visit each node on treepath, and return the last node

#### Type parameters

| Name | Type |
| :------ | :------ |
| `AC` | *boolean* |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treepath` | [*TreePath*](../modules/treepathns.md#treepath) \| [*TreePath*](../modules/treepathns.md#treepath)[] | treepath |
| `onVisit?` | (`treepath`: *string*, `node`: [*TreeNode*](treenode.md)<V\>) => *void* | when node visited, call "onVisit" |
| `inclusive?` | *boolean* | current node would be visited or not, default is false |
| `autoCreate?` | AC | auto create node when not exists |

**Returns:** AC *extends* ``true`` ? [*TreeNode*](treenode.md)<V\> : *undefined* \| [*TreeNode*](treenode.md)<V\>
