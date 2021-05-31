export namespace TreePathNS {
  export type TreePath = string | number;
}


export namespace TreeMapNS {

  export type GetOptions<V> = {
    /** when value not exists, create it. Default is false. */
    autoCreate?: false | (() => V);
  }

  export type ConstructOptions<V> = {
    autoCreateWhenGet?: GetOptions<V>['autoCreate'];
  }
}
