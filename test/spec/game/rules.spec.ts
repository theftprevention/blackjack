import { describe, expect, it } from 'vitest';
import { Rules } from '../../../src/game/rules';

describe('Rules', () => {
  it('uses the default ruleset when constructed with no arguments', () => {
    expect(new Rules()).toEqual(Rules.DEFAULT);
  });

  it('is read-only', () => {
    const rules = new Rules();
    for (const key of Reflect.ownKeys(rules)) {
      expect(() => { rules[key] = rules[key]; }).toThrow();
    }
  });

  it('converts the "allowSurrender" option to a boolean', () => {
    expect(new Rules({ allowSurrender: 42 })).toHaveProperty('allowSurrender', true);
    expect(new Rules({ allowSurrender: '' })).toHaveProperty('allowSurrender', false);
  });

  it('converts the "blackjackPayoutFactor" option to a finite number', () => {
    expect(new Rules({ blackjackPayoutFactor: '1.5' })).toHaveProperty('blackjackPayoutFactor', 1.5);
    expect(new Rules({ blackjackPayoutFactor: 42n })).toHaveProperty('blackjackPayoutFactor', 42);
    expect(new Rules({ blackjackPayoutFactor: 'Infinity' })).toHaveProperty('blackjackPayoutFactor', Rules.DEFAULT.blackjackPayoutFactor);
    expect(new Rules({ blackjackPayoutFactor: '-Infinity' })).toHaveProperty('blackjackPayoutFactor', Rules.DEFAULT.blackjackPayoutFactor);
  });

  it('converts the "dealerHitsOnSoft17" option to a boolean', () => {
    expect(new Rules({ dealerHitsOnSoft17: 42 })).toHaveProperty('dealerHitsOnSoft17', true);
    expect(new Rules({ dealerHitsOnSoft17: '' })).toHaveProperty('dealerHitsOnSoft17', false);
  });

  it('converts the "deckCount" option to a positive integer', () => {
    expect(new Rules({ deckCount: '1.5' })).toHaveProperty('deckCount', 1);
    expect(new Rules({ deckCount: 2n })).toHaveProperty('deckCount', 2);
    expect(new Rules({ deckCount: '-Infinity' })).toHaveProperty('deckCount', Rules.DEFAULT.deckCount);
  });

  it('converts the "doubleAfterSplit" option to a boolean', () => {
    expect(new Rules({ doubleAfterSplit: 42 })).toHaveProperty('doubleAfterSplit', true);
    expect(new Rules({ doubleAfterSplit: '' })).toHaveProperty('doubleAfterSplit', false);
  });

  it('converts the "maximumSplitCount" option to a positive integer or infinity', () => {
    expect(new Rules({ maximumSplitCount: '1.5' })).toHaveProperty('maximumSplitCount', 1);
    expect(new Rules({ maximumSplitCount: 2n })).toHaveProperty('maximumSplitCount', 2);
    expect(new Rules({ maximumSplitCount: '-Infinity' })).toHaveProperty('maximumSplitCount', 0);
    expect(new Rules({ maximumSplitCount: 'Infinity' })).toHaveProperty('maximumSplitCount', Number.POSITIVE_INFINITY);
  });

  it('converts the "seatCount" option to a positive integer', () => {
    expect(new Rules({ seatCount: '1.5' })).toHaveProperty('seatCount', 1);
    expect(new Rules({ seatCount: 2n })).toHaveProperty('seatCount', 2);
    expect(new Rules({ seatCount: '-Infinity' })).toHaveProperty('seatCount', Rules.DEFAULT.seatCount);
  });
});

describe('Rules.DEFAULT', () => {
  it('is a Rank instance', () => {
    expect(Rules.DEFAULT).toBeInstanceOf(Rules);
  });
  it('has the correct properties', () => {
    expect(Rules.DEFAULT).toMatchObject({
      allowSurrender: true,
      blackjackPayoutFactor: 1.5,
      dealerHitsOnSoft17: true,
      deckCount: 6,
      doubleAfterSplit: true,
      maximumSplitCount: 3,
      seatCount: 7,
    });
  });
  it('is a read-only property', () => {
    expect(() => { (Rules as any).DEFAULT = null; }).toThrow();
  });
});
