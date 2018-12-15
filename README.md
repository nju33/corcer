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
  ...matrix[0],
  ...matrix[1],
  ...matrix[2],
  ...matrix[3],
  ...matrix[4],
]);
expect(Corcer.uniq([0, 0, 0, 0])).toMatchObject([0]);
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
