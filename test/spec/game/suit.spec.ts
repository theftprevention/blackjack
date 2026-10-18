import { describe, expect, it } from 'vitest';
import { Suit } from '../../../src/game/suit';

describe('Suit', () => {
  it('has the correct properties', () => {
    const suit = new Suit('test', 'T');
    expect(suit).toHaveProperty('pluralName', 'tests');
    expect(suit).toHaveProperty('name', 'test');
    expect(suit).toHaveProperty('symbol', 'T');
  });

  it('is read-only', () => {
    const suit = new Suit('test', 'T') as Record<keyof Suit, unknown>;
    expect(() => { suit.pluralName = 'tests'; }).toThrow();
    expect(() => { suit.symbol = 'T'; }).toThrow();
    expect(() => { suit.name = 'test'; }).toThrow();
  });

  describe('constructor', () => {
    it('throws an error when the name parameter is null or empty', () => {
      expect(() => new (Suit as any)()).toThrow();
      expect(() => new (Suit as any)(null, 'X')).toThrow();
      expect(() => new (Suit as any)(void 0, 'X')).toThrow();
      expect(() => new (Suit as any)('', 'X')).toThrow();
    });

    it('throws an error when the symbol parameter is null or empty', () => {
      expect(() => new (Suit as any)('test')).toThrow();
      expect(() => new (Suit as any)('test', null)).toThrow();
      expect(() => new (Suit as any)('test', void 0)).toThrow();
      expect(() => new (Suit as any)('test', '')).toThrow();
    });
  });
});

describe('Suit.CLUBS', () => {
  it('is a Suit instance', () => {
    expect(Suit.CLUBS).toBeInstanceOf(Suit);
  });

  it('has the correct properties', () => {
    expect(Suit.CLUBS).toMatchObject({
      pluralName: 'clubs',
      name: 'club',
      symbol: '\u2663',
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Suit as any).CLUBS = null; }).toThrow();
  });
});

describe('Suit.DIAMONDS', () => {
  it('is a Suit instance', () => {
    expect(Suit.DIAMONDS).toBeInstanceOf(Suit);
  });

  it('has the correct properties', () => {
    expect(Suit.DIAMONDS).toMatchObject({
      pluralName: 'diamonds',
      name: 'diamond',
      symbol: '\u2666',
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Suit as any).DIAMONDS = null; }).toThrow();
  });
});

describe('Suit.HEARTS', () => {
  it('is a Suit instance', () => {
    expect(Suit.HEARTS).toBeInstanceOf(Suit);
  });

  it('has the correct properties', () => {
    expect(Suit.HEARTS).toMatchObject({
      pluralName: 'hearts',
      name: 'heart',
      symbol: '\u2665',
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Suit as any).HEARTS = null; }).toThrow();
  });
});

describe('Suit.SPADES', () => {
  it('is a Suit instance', () => {
    expect(Suit.SPADES).toBeInstanceOf(Suit);
  });

  it('has the correct properties', () => {
    expect(Suit.SPADES).toMatchObject({
      pluralName: 'spades',
      name: 'spade',
      symbol: '\u2660',
    });
  });

  it('is a read-only property', () => {
    expect(() => { (Suit as any).SPADES = null; }).toThrow();
  });
});

describe('Suit.ALL', () => {
  it('is a read-only array', () => {
    expect(Suit.ALL).toBeInstanceOf(Array);
    expect(Array.isArray(Suit.ALL)).toBe(true);
    expect(() => { (Suit.ALL as any[]).length = 0; }).toThrow();
    expect(() => { (Suit.ALL as any[]).splice(0); }).toThrow();
  });

  it('has the correct properties', () => {
    expect(Suit.ALL).toEqual([
      Suit.CLUBS,
      Suit.DIAMONDS,
      Suit.HEARTS,
      Suit.SPADES,
    ]);
  });

  it('is a read-only property', () => {
    expect(() => { (Suit as any).ALL = null; }).toThrow();
  });
});
