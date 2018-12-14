import memoizee from 'memoizee';

export class DoughPart<T> {
  constructor(public readonly matrix: T[][]) {}

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
}

export type Dough<T> = (
  x: number,
  y: number,
  xLength: number,
  yLength: number,
) => DoughPart<T>;

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

    return new DoughPart<T>(result);
  });
