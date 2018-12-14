export class Corcer<T> {
  /**
   * @param matrix ::
   */
  constructor(public readonly matrix: T[][]) {}

  get rows(): number {
    return this.matrix.length;
  }

  get columns(): number {
    return this.matrix[0].length;
  }

  /**
   * @param x1 upper x index ::
   * @param y1 upper y index ::
   * @param x2 lower x index ::
   * @param y2 lower y index ::
   */
  lens(x1: number, y1: number, x2: number, y2: number): Corcer<T> {
    const next: T[][] = [...Array(x2 - x1).map(() => [])];

    let i = x1;
    const untilI = x2;
    while (i < untilI) {
      let j = y1;
      const untilJ = y2;
      while (j < untilJ) {
        next[i][j] = this.matrix[x1 + i][y1 + j];
        j++;
      }

      i++;
    }

    return new Corcer(next);
  }

  uniq(items: T[]): T[] {
    return Array.from(
      items.reduce((list, item) => {
        list.add(item);
        return list;
      }, new Set<T>()),
    );
  }

  getItems(opts: {uniq: boolean} = {uniq: true}): T[] {
    const items = this.matrix.reduce(
      (result, line) => {
        return [...result, ...line];
      },
      [] as T[],
    );

    if (opts.uniq) {
      return this.uniq(items);
    }
    return items;
  }

  test(diff: Corcer<T> | T[][]): boolean {
    if (diff instanceof Corcer) {
      return this.matrix.toString() === diff.matrix.toString();
    }

    return this.matrix.toString() === diff.toString();
  }

  /**
   * @param x x index
   * @param y y index
   * @param newValue into value
   */
  replace(x: number, y: number, newValue: T): Corcer<T> {
    const result = this.matrix.map(a => [...a]);

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

    return new Corcer(result);
  }
}
