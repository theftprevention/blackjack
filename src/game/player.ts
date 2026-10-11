import { String } from '../common/utils';

export class Player {
  constructor(name: string) {
    this.name = String(name);
    Object.freeze(this);
  }

  readonly name: string;

  static {
    Object.freeze(this);
    Object.freeze(this.prototype);
  }
}
