export class Corcer<T> {
  static uniq<T>(items: T[]): T[] {
    return Array.from(
      items.reduce((list, item) => list.add(item), new Set<T>()),
    );
  }

  /**
   * @param matrix ::
   */
  constructor(
    public readonly matrix: T[][],
    public readonly ctx?: {
      parent: Corcer<T>;
      position: {x: number; y: number};
    },
  ) {}

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
    const next: T[][] = Array.from(Array(x2 - x1)).map(() => []);

    let i = 0;
    while (i < x2 - x1) {
      let j = 0;
      while (j < y2 - y1) {
        next[i][j] = this.matrix[x1 + i][y1 + j];
        j++;
      }

      i++;
    }

    return new Corcer(next, {
      parent: this,
      position: {x: x1, y: y1},
    });
  }

  getItems(opts: {uniq: boolean} = {uniq: true}): T[] {
    const items = this.matrix.reduce(
      (result, line) => {
        return [...result, ...line];
      },
      [] as T[],
    );

    if (opts.uniq) {
      return Corcer.uniq(items);
    }
    return items;
  }

  has(value: T) {
    return this.getItems().indexOf(value) > -1;
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
  replaceTo(newValue: T, corcer: Corcer<T>): Corcer<T> {
    if (this.ctx === undefined) {
      throw new TypeError('`replace` is limited to a child corcer');
    }

    const result = corcer.matrix.map(a => [...a]);

    let i = this.ctx.position.x;
    const untilI = corcer.rows;
    while (i < untilI) {
      let j = this.ctx.position.y;
      const untilJ = corcer.columns;
      while (j < untilJ) {
        result[i][j] = newValue;
        j++;
      }

      i++;
    }

    return new Corcer(result);
  }
}
