# corcer (corner cercle)

## Install

```sh
yarn add corcer
```

## Example

```ts
import corcer from 'corcer';

const matrix = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

const dough: corcer(matrix);
const part = dough(2, 2, 2, 2);

expect(part.matrix).toMatchObject([[0, 0], [0, 0]]);
expect(part.items).toMatchObject([0, 0, 0, 0]);
expect(part.uniqItems).toMatchObject([0]);
expect(part.uniqItemsInEach).toMatchObject([[0], [0]]);
expect(part.test([[0, 0], [0, 0]])).toBeTruthy();
expect(part.replace(2, 2, 1)).toMatchObject([
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
]);
```
