This small package converts a one dimensional array into a tree based on the elements' relationship in an efficient way ( O(n) ).

The usage is:
`unflatten(array: array, options?: {})`

#### Example:

```
import unflatten from 'unflatten';

const tree = unflatten([
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

#### The expected result:
```

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

Supported `options` parameters:

- __idKey__: What is the equivalent `id` identifier in the input array. _default: 'id'_ 
- __parentKey__: What is the equivalent `parent_id` identifier in the input array. _default: 'parent_id'_
- __childrenKey__: What should the `children` property be named in the resulting array. _default: 'children'_
- __rootParentsId__: What is the `id` of the root entries (The entries which have no parents themselves) _default: null_