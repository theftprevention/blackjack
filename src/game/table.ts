import { ReadonlyArray } from '../common/readonlyArray';
import { Card } from './card';
import { Player } from './player';
import { Rank } from './rank';
import { Rules } from './rules';
import { shuffleInPlace } from './shuffle';
import { Suit } from './suit';

export class Table {
  constructor(options?: TableOptions) {
    if (options == null) {
      options = {};
    }

    const discardedCards: Card[] = [];
    const players: Player[] = [];
    const rules = new Rules(options);
    const shoe: Card[] = [];

    let { deckCount } = rules;
    do {
      for (const suit of Suit.ALL) {
        for (const rank of Rank.ALL) {
          shoe.push(new Card(rank, suit));
        }
      }
    } while (--deckCount > 0);

    this.#discardedCards = discardedCards;
    this.#players = players;
    this.#shoe = shuffleInPlace(shoe);

    this.discardedCards = new ReadonlyArray(discardedCards);
    this.players = new ReadonlyArray(players);
    this.rules = rules;

    Object.freeze(this);
  }

  readonly #discardedCards: Card[];
  readonly #players: Player[];
  readonly #shoe: Card[];

  /**
   * An array of {@link Card}s representing the discard rack. Newly discarded cards are appended
   * to the end of this array.
   */
  readonly discardedCards: readonly Card[];
  /**
   * An array of {@link Player}s representing the players at the table. The players are ordered
   * clockwise around the table starting from the dealer's left.
   */
  readonly players: readonly Player[];
  /**
   * The rules for the table.
   */
  readonly rules: Rules;

  /**
   * The total number of cards in the discard rack.
   */
  get discardCount(): number {
    return this.#discardedCards.length;
  }

  /**
   * The total number of players at the table.
   */
  get playerCount(): number {
    return this.#players.length;
  }

  /**
   * The total number of cards remaining in the shoe.
   */
  get shoeCount(): number {
    return this.#shoe.length;
  }

  static {
    Object.freeze(this);
    Object.freeze(this.prototype);
  }
}

export interface TableOptions extends Partial<Record<keyof Rules, unknown>> {}
