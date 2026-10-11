import { describe, expect, it } from 'vitest';
import { Rank } from '../../../src/game/rank';

describe('Rank', () => {
  it('has the correct properties', () => {
    const rank = new Rank('test', 42, 'T', 'tests');
    expect(rank).toHaveProperty('pluralName', 'tests');
    expect(rank).toHaveProperty('singularName', 'test');
    expect(rank).toHaveProperty('symbol', 'T');
    expect(rank).toHaveProperty('values', [42]);
  });

  it('is read-only', () => {
    const rank = new Rank('test', 42, 'T', 'tests') as Record<keyof Rank, unknown>;
    expect(() => { rank.pluralName = 'tests'; }).toThrow();
    expect(() => { rank.singularName = 'test'; }).toThrow();
    expect(() => { rank.symbol = 'T'; }).toThrow();
    expect(() => { rank.values = [42]; }).toThrow();
    expect(() => { (rank.values as unknown[]).push(42); }).toThrow();
  });

  describe('constructor', () => {
    it('throws an error when the name parameter is null or empty', () => {
      expect(() => new (Rank as any)()).toThrow();
      expect(() => new (Rank as any)('', 2)).toThrow();
      expect(() => new (Rank as any)(null, 2)).toThrow();
      expect(() => new (Rank as any)(void 0, 2)).toThrow();
    });

    it('throws an error when the values parameter is invalid', () => {
      expect(() => new (Rank as any)('test', [])).toThrow();
      expect(() => new (Rank as any)('test', 'lol')).toThrow();
      expect(() => new (Rank as any)('test', new Set())).toThrow();
      expect(() => new (Rank as any)('test', {})).toThrow();
    });
  });
});

describe('Rank.TWO', () => {
  it('is a Rank instance', () => {
    expect(Rank.TWO).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.TWO).toMatchObject({
      pluralName: 'twos',
      singularName: 'two',
      symbol: '2',
      values: [2],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).TWO = null; }).toThrow();
  });
});

describe('Rank.THREE', () => {
  it('is a Rank instance', () => {
    expect(Rank.THREE).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.THREE).toMatchObject({
      pluralName: 'threes',
      singularName: 'three',
      symbol: '3',
      values: [3],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).THREE = null; }).toThrow();
  });
});

describe('Rank.FOUR', () => {
  it('is a Rank instance', () => {
    expect(Rank.FOUR).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.FOUR).toMatchObject({
      pluralName: 'fours',
      singularName: 'four',
      symbol: '4',
      values: [4],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).FOUR = null; }).toThrow();
  });
});

describe('Rank.FIVE', () => {
  it('is a Rank instance', () => {
    expect(Rank.FIVE).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.FIVE).toMatchObject({
      pluralName: 'fives',
      singularName: 'five',
      symbol: '5',
      values: [5],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).FIVE = null; }).toThrow();
  });
});

describe('Rank.SIX', () => {
  it('is a Rank instance', () => {
    expect(Rank.SIX).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.SIX).toMatchObject({
      pluralName: 'sixes',
      singularName: 'six',
      symbol: '6',
      values: [6],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).SIX = null; }).toThrow();
  });
});

describe('Rank.SEVEN', () => {
  it('is a Rank instance', () => {
    expect(Rank.SEVEN).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.SEVEN).toMatchObject({
      pluralName: 'sevens',
      singularName: 'seven',
      symbol: '7',
      values: [7],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).SEVEN = null; }).toThrow();
  });
});

describe('Rank.EIGHT', () => {
  it('is a Rank instance', () => {
    expect(Rank.EIGHT).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.EIGHT).toMatchObject({
      pluralName: 'eights',
      singularName: 'eight',
      symbol: '8',
      values: [8],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).EIGHT = null; }).toThrow();
  });
});

describe('Rank.NINE', () => {
  it('is a Rank instance', () => {
    expect(Rank.NINE).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.NINE).toMatchObject({
      pluralName: 'nines',
      singularName: 'nine',
      symbol: '9',
      values: [9],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).NINE = null; }).toThrow();
  });
});

describe('Rank.TEN', () => {
  it('is a Rank instance', () => {
    expect(Rank.TEN).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.TEN).toMatchObject({
      pluralName: 'tens',
      singularName: 'ten',
      symbol: '10',
      values: [10],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).TEN = null; }).toThrow();
  });
});

describe('Rank.JACK', () => {
  it('is a Rank instance', () => {
    expect(Rank.JACK).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.JACK).toMatchObject({
      pluralName: 'jacks',
      singularName: 'jack',
      symbol: 'J',
      values: [10],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).JACK = null; }).toThrow();
  });
});

describe('Rank.QUEEN', () => {
  it('is a Rank instance', () => {
    expect(Rank.QUEEN).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.QUEEN).toMatchObject({
      pluralName: 'queens',
      singularName: 'queen',
      symbol: 'Q',
      values: [10],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).QUEEN = null; }).toThrow();
  });
});

describe('Rank.KING', () => {
  it('is a Rank instance', () => {
    expect(Rank.KING).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.KING).toMatchObject({
      pluralName: 'kings',
      singularName: 'king',
      symbol: 'K',
      values: [10],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).KING = null; }).toThrow();
  });
});

describe('Rank.ACE', () => {
  it('is a Rank instance', () => {
    expect(Rank.ACE).toBeInstanceOf(Rank);
  });

  it('has the correct properties', () => {
    expect(Rank.ACE).toMatchObject({
      pluralName: 'aces',
      singularName: 'ace',
      symbol: 'A',
      values: [1, 11],
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).ACE = null; }).toThrow();
  });
});

describe('Rank.ALL', () => {
  it('is a read-only array', () => {
    expect(Rank.ALL).toBeInstanceOf(Array);
    expect(Array.isArray(Rank.ALL)).toBe(true);
    expect(() => { (Rank.ALL as any[]).length = 0; }).toThrow();
    expect(() => { (Rank.ALL as any[]).splice(0); }).toThrow();
  });

  it('has the correct elements', () => {
    expect(Rank.ALL).toEqual([
      Rank.TWO,
      Rank.THREE,
      Rank.FOUR,
      Rank.FIVE,
      Rank.SIX,
      Rank.SEVEN,
      Rank.EIGHT,
      Rank.NINE,
      Rank.TEN,
      Rank.JACK,
      Rank.QUEEN,
      Rank.KING,
      Rank.ACE,
    ]);
  });

  it('is a read-only property', () => {
    expect(() => { (Rank as any).ALL = null; }).toThrow();
  });
});
