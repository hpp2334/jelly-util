import { appendPath, parseTreePathString } from "./tree-path";
import { TreeMapNS, TreePathNS } from "./type";

const UNDEFINED_OBJECT = {} as any;

export class TreeNode<V> {
  private _treepath: string;
  private _value: V = UNDEFINED_OBJECT;
  private _parent: null | TreeNode<V> = null;
  private _selfKeyInParent: string | null = null;
  private _children: null | Map<string, TreeNode<V>> = null;

  /**
   * @ignore
   */
  constructor(treepath: string, value: V) {
    this._treepath = treepath;
    this._value = value;
  }

  /** get treepath from root to this node */
  get treepath() {
    return this._treepath;
  }

  /** get parent node */
  get parent() {
    return this._parent;
  }

  /** get key between this node and its parent */
  get parentKey() {
    return this._selfKeyInParent;
  }

  /** get map about Map<childkey, childNode> */
  get children() {
    return this._children;
  }

  hasValue() {
    return this._value !== UNDEFINED_OBJECT;
  }

  getValue() {
    return this._value === UNDEFINED_OBJECT ? undefined : this._value;
  }

  setValue(nextValue: V) {
    this._value = nextValue;
  }

  /** Remove value in this tree node */
  deleteValue() {
    this._value = UNDEFINED_OBJECT;
  }

  /**
   * Remove node in sub tree. NOTICE: this method only delete value for this node, and unlink between this node and its parent and children. 
   * @param inclusive include itself or not
   */
  removeAll(inclusive?: boolean) {
    if (!this._selfKeyInParent) {
      throw Error('_selfKeyInParent is null. It\'s a bug');
    }
    if (inclusive) {
      this._parent?._children?.delete(this._selfKeyInParent);
      this.deleteValue();
    }
    this._children = null;
  }

  getChild <AC extends boolean>(key: string, autoCreate: AC): AC extends true ? TreeNode<V> : TreeNode<V> | undefined {
    let childMap = this._children = this._children ?? new Map<string, TreeNode<V>>();
    let childNode: TreeNode<V> = undefined as any;
    if (childMap.has(key)) {
      childNode = childMap.get(key)!;
    } else if (!autoCreate) {
      return childNode as any;
    } else {
      childNode = createTreeNode(appendPath(this.treepath, key));
      childNode._parent = this;
      childNode._selfKeyInParent = key;
      childMap.set(key, childNode);
    }
    return childNode as any;
  }

  /**
   * get node by treepath
   * @param treepath treepath
   * @param autoCreate auto create node when not exists
   */
  access <AC extends boolean>(
    treepath: TreePathNS.TreePath | TreePathNS.TreePath[],
    autoCreate?: AC,
  ): AC extends true ? TreeNode<V> : TreeNode<V> | undefined {
    const node = this.visit(
      treepath,
      undefined,
      false,
      autoCreate,
    );
    return node;
  }
  
  /**
   * visit each node on treepath, and return the last node
   * @param treepath treepath
   * @param onVisit when node visited, call "onVisit"
   * @param inclusive current node would be visited or not, default is false
   * @param autoCreate auto create node when not exists
   */
  visit <AC extends boolean>(
    treepath: TreePathNS.TreePath | TreePathNS.TreePath[],
    onVisit?: (treepath: string, node: TreeNode<V>) => void,
    inclusive?: boolean,
    autoCreate?: AC,
  ): AC extends true ? TreeNode<V> : TreeNode<V> | undefined {
    let root: TreeNode<V> = this;
    let curpath = root.treepath;
    if (inclusive) {
      onVisit?.(curpath, root);
    }

    const treepaths = !Array.isArray(treepath) ? parseTreePathString(treepath) : treepath;
    let n = treepaths.length;
    for (let i = 0; i < n; i++) {
      let p = treepaths[i].toString();
      curpath = appendPath(curpath, p);

      const child = autoCreate
        ? root.getChild(p, true)
        : root.getChild(p, false);
      if (child) {
        onVisit?.(curpath, child);
        root = child;
      } else {
        return undefined as any;
      }
    }
    return root as any;
  }
}

/** @ignore */
export function createTreeNode<V>(treepath: string, value: V = UNDEFINED_OBJECT): TreeNode<V> {
  return new TreeNode(treepath, value);
}
