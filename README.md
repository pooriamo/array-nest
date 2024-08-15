This small package converts a one dimensional array into a tree based on the elements' relationship in an efficient way.

### Installation:
```
npm install array-nest
// OR
yarn add array-nest
```

The usage is:
`nest(array, options)`

### Example:

```ts
import nest from 'array-nest';

const tree = nest([
  { id: 1, parent_id: null, name: 'A' },
  { id: 2, parent_id: 1, name: 'B' },
  { id: 3, parent_id: 2, name: 'C' },
  { id: 4, parent_id: null, name: 'D' },
  { id: 5, parent_id: 1, name: 'E' },
  { id: 6, parent_id: 4, name: 'F' },
  { id: 7, parent_id: 6, name: 'G' },
]);

console.log(tree);
```

#### The result:
```ts

[
  {
    id: 1,
    parent_id: null,
    name: 'A',
    children: [
      {
        id: 2,
        parent_id: 1,
        name: 'B',
        children: [
          {
            id: 3,
            parent_id: 2,
            name: 'C',
            children: [],
          },
        ],
      },
      {
        id: 5,
        parent_id: 1,
        name: 'E',
        children: [],
      },
    ],
  },
  {
    id: 4,
    parent_id: null,
    name: 'D',
    children: [
      {
        id: 6,
        parent_id: 4,
        name: 'F',
        children: [
          {
            id: 7,
            parent_id: 6,
            name: 'G',
            children: [],
          },
        ],
      },
    ],
  },
]
```

### Overriding the default values:
```ts
import nest from 'array-nest';

const tree = nest([
  { code: 1, parent_code: '', name: 'A' },
  { code: 2, parent_code: 1, name: 'B' },
  { code: 3, parent_code: 2, name: 'C' },
  { code: 4, parent_code: '', name: 'D' },
  { code: 5, parent_code: 1, name: 'E' },
  { code: 6, parent_code: 4, name: 'F' },
  { code: 7, parent_code: 6, name: 'G' },
], {
  idKey: 'code',
  parentKey: 'parent_code',
  rootParentsId: '',
  childrenKey: 'subtree'
});
```

### Supported `options`:

- __idKey__: The equivalent of `id` key in the input array. _default: 'id'_
- __parentKey__: The equivalent of `parent_id` key in the input array. _default: 'parent_id'_
- __childrenKey__: What the nested property should be named in the resulting array. _default: 'children'_
- __rootParentsId__: The `id` of the root entries (The entries which have no parents themselves) _default: null_
