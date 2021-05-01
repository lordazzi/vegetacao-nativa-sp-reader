/**
 * Class that helps with string manipulation
 */
export class IterableString {

  private cursor = 0;

  constructor(
    private str: string
  ) { }

  get currenPosition(): number {
    return this.cursor;
  }

  /**
   * Return the string in it current cursor position
   */
  toString(): string {
    return this.str.substr(this.cursor);
  }

  /**
   * Return the original string
   */
  getOriginalString(): string {
    return this.str;
  }

  /**
   * Move the cursor and return the result
   */
  addCursor(param?: number | string | RegExp): string {
    if (typeof param === 'number') {
      return this.addCursorNumeric(param);
    } else if (typeof param === 'string') {
      return this.addCursorRegExp(new RegExp(param));
    } else if (param instanceof RegExp) {
      return this.addCursorRegExp(param);
    } else {
      return this.addCursorNumeric();
    }
  }

  /**
   * Return result without move cursor
   */
  spy(param?: number | string | RegExp): string {
    if (typeof param === 'number') {
      return this.spyNumeric(param);
    } else if (typeof param === 'string') {
      return this.spyRegExp(new RegExp(param));
    } else if (param instanceof RegExp) {
      return this.spyRegExp(param);
    } else {
      return this.spyNumeric();
    }
  }

  private spyNumeric(howMuchMore = 1): string {
    return this.str.substr(this.cursor, howMuchMore);
  }

  private spyRegExp(pattern: RegExp): string {
    const matches = String(this).match(pattern);
    return matches && matches.length && matches[0] || '';
  }

  /**
   * Move the cursor that's iterating the string
   */
  private addCursorRegExp(pattern: RegExp): string {
    if (!String(pattern).match(/^\/\^/)) {
      throw new Error(
        `all regexp used to move the cursor in the iterable string must start with ^. Entry regex: "${String(pattern)}"`
      );
    }

    const match = this.spyRegExp(pattern);

    return this.addCursorNumeric(match.length || 0);
  }

  /**
   * If find an match with the regexp argument, it return the match and move the cursor
   */
  private addCursorNumeric(howMuchMore = 1): string {
    const piece = this.spyNumeric(howMuchMore);
    this.cursor += howMuchMore;

    return piece;
  }

  end(): boolean {
    return this.str.length <= this.cursor;
  }
}
