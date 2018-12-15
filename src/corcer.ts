export class Corcer<T> {
  static flat<T>(items: T[][], pad: T): T[][] {
    const sizes = items.map(item => item.length);
    const maxSize = Math.max(...sizes);

    items.forEach(item => {
      if (item.length < maxSize) {
        item.push(...Array.from(Array(maxSize - item.length)).map(() => pad));
      }
    });

    return items;
  }

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
        next[i][j] = this.matrix[y1 + j][x1 + i];
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

  /**
   * :::::     :::::
   * ::::: === :::::
   * :::::     :::::
   */
  test(diff: Corcer<T> | T[][]): boolean {
    if (diff instanceof Corcer) {
      return this.matrix.toString() === diff.matrix.toString();
    }

    return this.matrix.toString() === diff.toString();
  }

  /**
   *      :::::
   * :: ⊆ :::::
   *      :::::
   */
  search(diff: Corcer<T> | T[][]): Corcer<T> | undefined {
    let matrix: T[][];
    if (diff instanceof Corcer) {
      matrix = diff.matrix;
    } else {
      matrix = diff;
    }

    let currentIndex = 0;
    const matrixLength = this.matrix.length;
    let result: {x: number; y: number} | undefined;
    while (currentIndex < matrixLength) {
      const lineString = matrix[0].join('');
      const re = new RegExp(lineString, 'g');
      while (re.exec(this.matrix[currentIndex].join(''))) {
        const startIndex = re.lastIndex - lineString.length;

        let count = 1;
        while (count < matrix.length) {
          if (
            startIndex !==
            this.matrix[currentIndex + count]
              .join('')
              .indexOf(matrix[count].join(''))
          ) {
            break;
          }

          count++;

          if (count === matrix.length) {
            result = {x: startIndex, y: currentIndex};
          }
        }
      }

      if (result !== undefined) {
        break;
      }

      currentIndex++;
    }

    if (result === undefined) {
      return;
    }

    // tslint:disable:no-non-null-assertion
    return new Corcer(
      Array.from(Array(matrix.length)).map((_, i) => {
        return this.matrix[result!.y + i].slice(
          result!.x,
          result!.x + matrix[i].length,
        );
      }),
      {
        parent: this,
        position: result,
      },
    );
    // tslint:disable:no-non-null-assertion
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
        result[j][i] = newValue;
        j++;
      }

      i++;
    }

    return new Corcer(result);
  }
}
