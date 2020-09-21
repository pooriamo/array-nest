import assert from 'assert';
import unflatten from '../src';

function generateSampleArray(
  idKey = 'id',
  parentIdKey = 'parent_id',
  rootParentsId = null,
) {
  return [
    { [idKey]: 1, [parentIdKey]: rootParentsId, name: 'A' },
    { [idKey]: 2, [parentIdKey]: 1, name: 'B' },
    { [idKey]: 3, [parentIdKey]: 2, name: 'C' },
    { [idKey]: 4, [parentIdKey]: rootParentsId, name: 'D' },
    { [idKey]: 5, [parentIdKey]: 1, name: 'E' },
    { [idKey]: 6, [parentIdKey]: 4, name: 'F' },
    { [idKey]: 7, [parentIdKey]: 6, name: 'G' },
  ];
}

function generateExpectedTree(
  idKey = 'id',
  parentIdKey = 'parent_id',
  childrenKey = 'children',
  rootParentsId = null,
) {
  return [
    {
      [idKey]: 1,
      [parentIdKey]: rootParentsId,
      name: 'A',
      [childrenKey]: [
        {
          [idKey]: 2,
          [parentIdKey]: 1,
          name: 'B',
          [childrenKey]: [
            {
              [idKey]: 3,
              [parentIdKey]: 2,
              name: 'C',
              [childrenKey]: [],
            },
          ],
        },
        {
          [idKey]: 5,
          [parentIdKey]: 1,
          name: 'E',
          [childrenKey]: [],
        },
      ],
    },
    {
      [idKey]: 4,
      [parentIdKey]: rootParentsId,
      name: 'D',
      [childrenKey]: [
        {
          [idKey]: 6,
          [parentIdKey]: 4,
          name: 'F',
          [childrenKey]: [
            {
              [idKey]: 7,
              [parentIdKey]: 6,
              name: 'G',
              [childrenKey]: [],
            },
          ],
        },
      ],
    },
  ];
}

describe('unflatten', () => {
  it('convert a one dimentional array to a tree', () => {
    const testArray = generateSampleArray();

    const tree = unflatten(testArray);

    const expectedTree = generateExpectedTree();

    assert.deepStrictEqual(tree, expectedTree);
  });

  it('use different options', () => {
    const testArray = generateSampleArray('customId', 'parent', 0);

    const tree = unflatten(testArray, {
      idKey: 'customId',
      parentKey: 'parent',
      childrenKey: 'subtree',
      rootParentsId: 0,
    });

    const expectedTree = generateExpectedTree('customId', 'parent', 'subtree', 0);

    assert.deepStrictEqual(tree, expectedTree);
  });

  it('get illegal input', () => {
    assert.throws(() => {
      unflatten(false);
    }, {
      name: 'TypeError',
      message: 'The input must be an array.',
    });

    assert.throws(() => {
      unflatten(['a']);
    }, {
      name: 'TypeError',
      message: 'Found an element with no \'id\' key',
    });
  });
});
