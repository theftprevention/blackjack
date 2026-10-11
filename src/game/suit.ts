import {
  defineProperties,
  freeze,
  toStringNonNull,
  TypeError,
} from '../common/utils';

export class Suit {
  constructor (singularName: string, symbol: string, pluralName?: string) {
    singularName = toStringNonNull(singularName);
    if (!singularName) {
      throw new TypeError('Suit name is required');
    }
    symbol = toStringNonNull(symbol);
    if (!symbol) {
      throw new TypeError('Suit symbol is required');
    }
    this.#pluralName = toStringNonNull(pluralName) || `${singularName}s`;
    this.#singularName = singularName;
    this.#symbol = symbol;
    freeze(this);
  }

  readonly #pluralName: string;
  readonly #singularName: string;
  readonly #symbol: string;

  get pluralName(): string {
    return this.#pluralName;
  }

  get singularName(): string {
    return this.#singularName;
  }

  get symbol(): string {
    return this.#symbol;
  }

  static readonly ALL: Iterable<Suit>;
  static readonly CLUBS: Suit;
  static readonly DIAMONDS: Suit;
  static readonly HEARTS: Suit;
  static readonly SPADES: Suit;

  static {
    const clubs = new this('club', '\u2663');
    const diamonds = new this('diamond', '\u2666');
    const hearts = new this('heart', '\u2665');
    const spades = new this('spade', '\u2660');

    const suits = freeze([clubs, diamonds, hearts, spades]);

    const descriptors: PropertyDescriptorMap = {
      ALL: {
        configurable: false,
        enumerable: false,
        value: suits,
        writable: false,
      },
    };
    for (const suit of suits) {
      descriptors[suit.pluralName.toUpperCase()] = {
        configurable: false,
        enumerable: false,
        value: suit,
        writable: false,
      };
    }
    defineProperties(this, descriptors);
    freeze(this);
    freeze(this.prototype);
  }
}
