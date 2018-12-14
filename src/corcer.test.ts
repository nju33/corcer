import {Corcer} from './corcer';

const MATRIX = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

let corcer: Corcer<number>;

beforeEach(() => {
  corcer = new Corcer(MATRIX);
});

test('basis', () => {
  expect(corcer.matrix).toMatchObject(MATRIX);
  expect(corcer.lens(2, 2, 2, 2).matrix).toMatchObject([[0, 0], [0, 0]]);
  // expect(corcer.getItems()).toMatchObject([0, 0, 0, 0]);
  // expect(corcer.getItems({uniq: true})).toMatchObject([0]);
  // expect(corcer.uniq([0, 0, 0, 0])).toMatchObject([0]);
  // expect(corcer.lens(2, 2, 2, 2).test([[0, 0], [0, 0]])).toBeTruthy();
  // expect(corcer.replace(2, 2, 1)).toMatchObject([
  //   [1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1],
  // ]);
});
