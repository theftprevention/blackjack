import { freeze, TypeError } from '../common/utils';
import { Rank } from './rank';
import { Suit } from './suit';

export class Card {
  constructor(rank: Rank, suit: Suit) {
    if (!(rank instanceof Rank)) {
      throw new TypeError('Card rank must be a Rank instance');
    }
    if (!(suit instanceof Suit)) {
      throw new TypeError('Card suit must be a Suit instance');
    }
    this.#rank = rank;
    this.#suit = suit;
    freeze(this);
  }

  readonly #rank: Rank;
  readonly #suit: Suit;

  get isFaceCard(): boolean {
    return this.rank.hasFace;
  }

  get name(): string {
    return `${this.rank.name} of ${this.suit.pluralName}`;
  }

  get rank(): Rank {
    return this.#rank;
  }

  get suit(): Suit {
    return this.#suit;
  }

  static {
    freeze(this);
    freeze(this.prototype);
  }
}
