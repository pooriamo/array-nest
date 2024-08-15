declare type Options<T extends BaseObject, ChildKey extends string> = {
    idKey?: keyof T;
    parentKey?: keyof T;
    childrenKey?: ChildKey;
    rootParentsId?: string | number | null;
};
declare type Node<T, ChildrenKey extends string> = T & {
    [key in ChildrenKey]: Node<T, ChildrenKey>[];
};
declare type BaseObject = Record<string | symbol | number, unknown>;
export default function nest<T extends BaseObject, ChildKey extends string = 'children'>(array: T[], options?: Options<T, ChildKey>): Node<T, ChildKey>[];
export {};
