import {
  arrayFrom,
  defineProperties,
  freeze,
  isArray,
  Set,
  String,
  toSafeInteger,
  toStringNonNull,
  TypeError,
} from '../common/utils';

export class Rank {
  constructor(
    name: string,
    values: number | readonly number[],
    symbol?: string,
    pluralName?: string
  ) {
    const rankValues = toRankValues(values);
    name = toStringNonNull(name);
    if (!name) {
      throw new TypeError('Rank name is required');
    }
    const firstValueSymbol = String(rankValues[0]);
    symbol = toStringNonNull(symbol) || firstValueSymbol;
    this.#hasFace = symbol !== firstValueSymbol;
    this.#pluralName = toStringNonNull(pluralName) || `${name}s`;
    this.#name = name;
    this.#symbol = symbol;
    this.#values = rankValues;
    freeze(this);
  }

  readonly #hasFace: boolean;
  readonly #pluralName: string;
  readonly #name: string;
  readonly #symbol: string;
  readonly #values: readonly [number] | readonly [number, number];

  get hasFace(): boolean {
    return this.#hasFace;
  }

  get pluralName(): string {
    return this.#pluralName;
  }

  get name(): string {
    return this.#name;
  }

  get symbol(): string {
    return this.#symbol;
  }

  get values(): readonly [number] | readonly [number, number] {
    return this.#values;
  }

  static readonly ALL: Iterable<Rank>;
  static readonly ACE: Rank;
  static readonly EIGHT: Rank;
  static readonly FIVE: Rank;
  static readonly FOUR: Rank;
  static readonly JACK: Rank;
  static readonly KING: Rank;
  static readonly NINE: Rank;
  static readonly QUEEN: Rank;
  static readonly SEVEN: Rank;
  static readonly SIX: Rank;
  static readonly TEN: Rank;
  static readonly THREE: Rank;
  static readonly TWO: Rank;

  static {
    const ace = new this('ace', [1, 11], 'A');
    const eight = new this('eight', 8);
    const five = new this('five', 5);
    const four = new this('four', 4);
    const jack = new this('jack', 10, 'J');
    const king = new this('king', 10, 'K');
    const nine = new this('nine', 9);
    const queen = new this('queen', 10, 'Q');
    const seven = new this('seven', 7);
    const six = new this('six', 6, '6', 'sixes');
    const ten = new this('ten', 10);
    const three = new this('three', 3);
    const two = new this('two', 2);

    const ranks = Object.freeze([
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten,
      jack,
      queen,
      king,
      ace,
    ]);

    const descriptors: PropertyDescriptorMap = {
      ALL: {
        configurable: false,
        enumerable: false,
        value: ranks,
        writable: false,
      },
    };
    for (const rank of ranks) {
      descriptors[rank.name.toUpperCase()] = {
        configurable: false,
        enumerable: false,
        value: rank,
        writable: false,
      };
    }
    defineProperties(this, descriptors);

    freeze(this);
    freeze(this.prototype);
  }
}

function invalidRankValue(value: unknown): TypeError {
  const stringifiedValue = String(value);
  return new TypeError(
    `Invalid rank value: ${typeof value === 'string' ? `"${stringifiedValue}"` : stringifiedValue}`
  );
}

function toRankValue(value: unknown): number {
  const rankValue = toRankValueOrNull(value);
  if (rankValue == null) {
    throw invalidRankValue(value);
  }
  return rankValue;
}

function toRankValueOrNull(value: unknown): number | null {
  return toSafeInteger(value, null, 1);
}

function toRankValues(value: unknown): readonly [number] | readonly [number, number] {
  if (value == null) {
    throw invalidRankValue(value);
  }
  if (!isArray(value)) {
    const rankValue = toRankValueOrNull(value);
    if (rankValue) {
      return freeze([rankValue]);
    }
  }
  const values = arrayFrom(new Set(arrayFrom(value as any, toRankValue)));
  switch (values.length) {
    case 1:
    case 2:
      return freeze(values) as readonly [number] | readonly [number, number];
    default:
      throw invalidRankValue(value);
  }
}
