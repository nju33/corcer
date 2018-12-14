import memoizee from 'memoizee';

export class DoughPart<T> {
  /**
   * @param matrix part of matrix (.)
   * @param originalMatrix all (:::)
   */
  constructor(
    public readonly matrix: T[][],
    public readonly originalMatrix: T[][],
  ) {}

  private uniq(items: T[]): T[] {
    return Array.from(
      items.reduce((list, item) => {
        list.add(item);
        return list;
      }, new Set<T>()),
    );
  }

  get items(): T[] {
    return this.matrix.reduce(
      (result, line) => {
        return [...result, ...line];
      },
      [] as T[],
    );
  }

  get uniqItems(): T[] {
    const items = this.items;
    return this.uniq(items);
  }

  get uniqItemsInEach(): T[][] {
    return this.matrix.reduce(
      (result, line) => {
        result.push(this.uniq(line));
        return result;
      },
      [] as T[][],
    );
  }

  test(diff: T[][]) {
    return this.matrix.toString() === diff.toString();
  }

  /**
   * @param x x index
   * @param y y index
   * @param newValue into value
   */
  replace(x: number, y: number, newValue: T): T[][] {
    const result = this.originalMatrix.map(a => [...a]);
    let i = 0;
    const untilI = this.matrix.length;

    while (i < untilI) {
      let j = 0;
      const untilJ = this.matrix[i].length;

      while (j < untilJ) {
        result[x + i][y + j] = newValue;
        j++;
      }
      i++;
    }

    return result;
  }
}

export type Dough<T> = ((
  x: number,
  y: number,
  xLength: number,
  yLength: number,
) => DoughPart<T>);

export type Corcer<T> = (
  matrix: T[][],
) => Dough<T> & memoizee.Memoized<Dough<T>>;

export const corcer = <T>(matrix: T[][]) =>
  memoizee((x: number, y: number, xLength: number, yLength: number) => {
    const result: T[][] = [] as any;
    let i = 0;
    while (i < yLength) {
      result.push(matrix[y + i].slice(x, x + xLength));
      i++;
    }

    return new DoughPart<T>(result, matrix);
  });
