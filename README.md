# corcer (corner cercle)

## Install

```sh
yarn add corcer
```

## Example

```ts
import Corcer from 'corcer';

const matrix = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

const corcer = new Corcer(matrix);

expect(corcer.matrix).toMatchObject(matrix);
expect(corcer.lens(2, 2, 4, 4).matrix).toMatchObject([[0, 0], [0, 0]]);

expect(corcer.getItems()).toMatchObject([1, 0]);
expect(corcer.getItems({uniq: false})).toMatchObject([
  ...MATRIX[0],
  ...MATRIX[1],
  ...MATRIX[2],
  ...MATRIX[3],
  ...MATRIX[4],
]);
expect(corcer.uniq([0, 0, 0, 0])).toMatchObject([0]);
expect(corcer.has(1)).toBeTruthy();

expect(corcer.lens(2, 2, 4, 4).test([[0, 0], [0, 0]])).toBeTruthy();
expect(corcer.lens(2, 2, 4, 4).replaceTo(1, corcer).matrix).toMatchObject([
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
]);
```
