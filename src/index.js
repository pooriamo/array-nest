const defaultOptions = {
  idKey: 'id',
  parentKey: 'parent_id',
  childrenKey: 'children',
  rootParentsId: null,
};

const unflatten = function unflatten(array, options = {}) {
  const {
    idKey: ID_KEY,
    parentKey: PARENT_KEY,
    childrenKey: CHILDREN_KEY,
    rootParentsId: ROOT_PARENTS_ID,
  } = {
    ...defaultOptions,
    ...options,
  };

  if (!Array.isArray(array)) {
    throw new TypeError('The input must be an array.');
  }

  [ID_KEY, PARENT_KEY].forEach((key) => {
    if (array.some((el) => !Object.prototype.hasOwnProperty.call(el, key))) {
      throw new TypeError(`Found an element with no '${key}' key`);
    }
  });

  const buildTree = (parentId) => {
    let tree = array.filter((item) => item[PARENT_KEY] === parentId);

    if (tree.length > 0) {
      tree = tree.map((item) => ({
        ...item,
        [CHILDREN_KEY]: buildTree(item[ID_KEY]),
      }));
    }

    return tree;
  };

  return buildTree(ROOT_PARENTS_ID);
};

export default unflatten;
