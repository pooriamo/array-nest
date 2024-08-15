type Options<T extends BaseObject, ChildKey extends string> = {
  idKey?: keyof T;
  parentKey?: keyof T;
  childrenKey?: ChildKey;
  rootParentsId?: string | number | null;
}

const defaultOptions = {
  idKey: 'id',
  parentKey: 'parent_id',
  childrenKey: 'children',
  rootParentsId: null,
};

type Node<T, ChildrenKey extends string> = T & {
  [key in ChildrenKey]: Node<T, ChildrenKey>[];
}

type BaseObject = Record<string | symbol |number, unknown>

export default function nest<T extends BaseObject, ChildKey extends string = 'children'>(array: T[], options?: Options<T, ChildKey>): Node<T, ChildKey>[] {
  const ID_KEY = options?.idKey ?? defaultOptions.idKey as keyof T;
  const PARENT_KEY = options?.parentKey ?? defaultOptions.parentKey as keyof T;
  const CHILDREN_KEY = options?.childrenKey ?? defaultOptions.childrenKey as ChildKey;
  const ROOT_PARENTS_ID = options?.rootParentsId ?? defaultOptions.rootParentsId;

  if (ID_KEY === PARENT_KEY) {
    throw new TypeError(`The values for '${String(ID_KEY)}' and '${String(PARENT_KEY)}' can not be the same`);
  }

  if (!Array.isArray(array)) {
    throw new TypeError('The input must be an array.');
  }

  array.forEach((item) => {
    if (!Object.prototype.hasOwnProperty.call(item, ID_KEY)) {
      throw new TypeError(`The item must have an '${String(ID_KEY)}' key`);
    }
    if (!Object.prototype.hasOwnProperty.call(item, PARENT_KEY)) {
      throw new TypeError(`The item must have an '${String(PARENT_KEY)}' key`);
    }
    if (item[ID_KEY] === item[PARENT_KEY]) {
      throw new TypeError(`The item cannot have the same '${String(ID_KEY)}' and '${String(PARENT_KEY)}' keys`);
    }
    if (!isKey(item[ID_KEY])) {
      throw new TypeError(`The '${String(ID_KEY)}' key must be a string or a number`);
    }
  })

  const buildTree = (parentId: Options<T, ChildKey>['rootParentsId']): Node<T, ChildKey>[] => {
    const tree = array.filter((item) => item[PARENT_KEY] === parentId);
    return tree.map((item) => ({
      ...item,
      [CHILDREN_KEY]: buildTree(item[ID_KEY] as Options<T, ChildKey>['rootParentsId']),
    }))
  };

  return buildTree(ROOT_PARENTS_ID);
};

function isKey(value: unknown): value is string | number | symbol {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol';
}
