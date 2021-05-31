[@jelly-util/tree-map](../README.md) / TreeMapNS

# Namespace: TreeMapNS

## Table of contents

### Type aliases

- [ConstructOptions](treemapns.md#constructoptions)
- [GetOptions](treemapns.md#getoptions)

## Type aliases

### ConstructOptions

Ƭ **ConstructOptions**<V\>: *object*

#### Type parameters

| Name |
| :------ |
| `V` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `autoCreateWhenGet?` | [*GetOptions*](treemapns.md#getoptions)<V\>[``"autoCreate"``] |

___

### GetOptions

Ƭ **GetOptions**<V\>: *object*

#### Type parameters

| Name |
| :------ |
| `V` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoCreate?` | ``false`` \| () => V | when value not exists, create it. Default is false. |
