import { describe, expect, it } from 'vitest';
import { Card } from '../../../src/game/card';
import { Rank } from '../../../src/game/rank';
import { Suit } from '../../../src/game/suit';

describe('Card', () => {
  it('has the correct properties', () => {
    const card = new Card(Rank.TWO, Suit.CLUBS);
    expect(card).toHaveProperty('name', 'two of clubs');
    expect(card).toHaveProperty('rank', Rank.TWO);
    expect(card).toHaveProperty('suit', Suit.CLUBS);
  });

  it('is read-only', () => {
    const card = new Card(Rank.ACE, Suit.HEARTS);
    expect(() => { (card as any).name = 'hello world' }).toThrow();
    expect(() => { (card as any).rank = Rank.TEN }).toThrow();
    expect(() => { (card as any).suit = Suit.DIAMONDS }).toThrow();
  });

  describe('constructor', () => {
    it('throws an error when the rank parameter is not a Rank instance', () => {
      expect(() => new (Card as any)()).toThrow();
      expect(() => new (Card as any)(2, Suit.CLUBS)).toThrow();
      expect(() => new (Card as any)('2', Suit.CLUBS)).toThrow();
      expect(() => new (Card as any)(null, Suit.CLUBS)).toThrow();
      expect(() => new (Card as any)(void 0, Suit.CLUBS)).toThrow();
      expect(() => new (Card as any)({ ...Rank.TWO }, Suit.CLUBS)).toThrow();
    });

    it('throws an error when the suit parameter is not a Suit instance', () => {
      expect(() => new (Card as any)(Rank.TWO)).toThrow();
      expect(() => new (Card as any)(Rank.TWO, 'club')).toThrow();
      expect(() => new (Card as any)(Rank.TWO, 'clubs')).toThrow();
      expect(() => new (Card as any)(Rank.TWO, '\u2663')).toThrow();
      expect(() => new (Card as any)(Rank.TWO, null)).toThrow();
      expect(() => new (Card as any)(Rank.TWO, void 0)).toThrow();
      expect(() => new (Card as any)(Rank.TWO, { ...Suit.CLUBS })).toThrow();
    });
  });
});
