import { min, toFiniteNumber, toSafeInteger, toSafeIntegerOrInfinity } from '../common/utils';

const MAXIMUM_DECK_COUNT = 8;
const MAXIMUM_SEAT_COUNT = 7;

const DEFAULTS = Object.freeze({
  allowSurrender: true,
  blackjackPayoutFactor: 1.5,
  dealerHitsOnSoft17: true,
  deckCount: 6,
  doubleAfterSplit: true,
  maximumSplitCount: 3,
  seatCount: MAXIMUM_SEAT_COUNT,
}) satisfies Omit<Rules, never>;

export type RuleKey = (keyof Rules) & (keyof RuleOptions);

export type RuleOptions = {
  [Key in keyof Rules]+?: Rules[Key];
};

export class Rules {
  constructor(options?: Partial<Record<keyof RuleOptions, unknown>>) {
    if (options == null) {
      options = { __proto__: null } as any as Partial<Record<keyof RuleOptions, unknown>>;
    }
    const rule: <K extends RuleKey>(
      key: K,
      converter: (value: unknown) => Rules[K]
    ) => Rules[K] = (key, convert) => {
      return key in options ? convert(options[key]) : Rules.DEFAULT[key];
    };
    this.#allowSurrender = rule('allowSurrender', Boolean);
    this.#blackjackPayoutFactor = rule('blackjackPayoutFactor', toBlackjackPayoutFactor);
    this.#dealerHitsOnSoft17 = rule('dealerHitsOnSoft17', Boolean);
    this.#deckCount = rule('deckCount', toDeckCount);
    this.#doubleAfterSplit = rule('doubleAfterSplit', Boolean);
    this.#maximumSplitCount = rule('maximumSplitCount', toMaximumSplitCount);
    this.#seatCount = rule('seatCount', toSeatCount);
    Object.freeze(this);
  }

  readonly #allowSurrender: boolean;
  readonly #blackjackPayoutFactor: number;
  readonly #dealerHitsOnSoft17: boolean;
  readonly #deckCount: number;
  readonly #doubleAfterSplit: boolean;
  readonly #maximumSplitCount: number;
  readonly #seatCount: number;

  get allowSurrender(): boolean {
    return this.#allowSurrender;
  }

  get blackjackPayoutFactor(): number {
    return this.#blackjackPayoutFactor;
  }

  get dealerHitsOnSoft17(): boolean {
    return this.#dealerHitsOnSoft17;
  }

  get deckCount(): number {
    return this.#deckCount;
  }

  get doubleAfterSplit(): boolean {
    return this.#doubleAfterSplit;
  }

  get maximumSplitCount(): number {
    return this.#maximumSplitCount;
  }

  get seatCount(): number {
    return this.#seatCount;
  }

  static readonly DEFAULT: Rules;

  static {
    Object.defineProperties(this, {
      DEFAULT: {
        configurable: false,
        enumerable: false,
        value: new this(DEFAULTS),
        writable: false,
      },
    });
    Object.freeze(this);
    Object.freeze(this.prototype);
  }
}

function toBlackjackPayoutFactor(value: unknown): number {
  return toFiniteNumber(value, DEFAULTS.blackjackPayoutFactor);
}

function toDeckCount(value: unknown): number {
  return min(MAXIMUM_DECK_COUNT, toSafeInteger(value, DEFAULTS.deckCount, 1));
}

function toMaximumSplitCount(value: unknown): number {
  return toSafeIntegerOrInfinity(value, DEFAULTS.maximumSplitCount, 0);
}

function toSeatCount(value: unknown): number {
  return min(MAXIMUM_SEAT_COUNT, toSafeInteger(value, DEFAULTS.seatCount, 1));
}
