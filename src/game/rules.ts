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
}) satisfies Rules;

export type RuleOptions = {
  [Key in keyof Rules]+?: Rules[Key];
};

export class Rules {
  constructor(options?: Partial<Record<keyof RuleOptions, unknown>>) {
    if (options == null) {
      return Rules.DEFAULT;
    }
    const rule: <K extends keyof RuleOptions>(
      key: K,
      converter: (value: unknown) => RuleOptions[K]
    ) => void = (key, convert) => {
      (this as RuleOptions)[key] = key in options ? convert(options[key]) : Rules.DEFAULT[key];
    };
    rule('allowSurrender', Boolean);
    rule('blackjackPayoutFactor', toBlackjackPayoutFactor);
    rule('dealerHitsOnSoft17', Boolean);
    rule('deckCount', toDeckCount);
    rule('doubleAfterSplit', Boolean);
    rule('maximumSplitCount', toMaximumSplitCount);
    rule('seatCount', toSeatCount);
    Object.freeze(this);
  }

  declare readonly allowSurrender: boolean;
  declare readonly blackjackPayoutFactor: number;
  declare readonly dealerHitsOnSoft17: boolean;
  declare readonly deckCount: number;
  declare readonly doubleAfterSplit: boolean;
  declare readonly maximumSplitCount: number;
  declare readonly seatCount: number;

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
