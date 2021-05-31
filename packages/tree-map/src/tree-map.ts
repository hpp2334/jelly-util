import { TreeNode, createTreeNode } from "./tree-node";
import { TreeMapNS } from "./type";

export class TreeMap<V = any> {
  private _root: TreeNode<V> = createTreeNode('/')

  get root() {
    return this._root;
  }
}
