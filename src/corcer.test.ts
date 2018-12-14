import {corcer, Corcer} from './corcer';

const MATRIX = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

let dough: ReturnType<Corcer<number>>;

beforeEach(() => {
  dough = corcer(MATRIX);
});

test('basis', () => {
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
});
