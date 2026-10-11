import { describe, expect, it } from 'vitest';
import {
  toArrayLength,
  toFiniteNumber,
  toLength,
  toSafeInteger,
  toSafeIntegerOrInfinity,
  toStringNonNull,
} from '../../../src/common/utils';

function testLengthFn(name: string, fn: (value: unknown) => number, max: number): void {
  describe(`${name}()`, () => {
    it('returns 0 when invoked with a non-numeric value', () => {
      expect(fn(Number.NaN)).toBe(0);
      expect(fn('NaN')).toBe(0);
      expect(fn('Hello world!')).toBe(0);
      expect(fn({})).toBe(0);
    });

    it('returns 0 when invoked with -1', () => {
      expect(fn(-1)).toBe(0);
      expect(fn(-1n)).toBe(0);
      expect(fn('-1')).toBe(0);
    });

    it('returns 0 when invoked with -Infinity', () => {
      expect(fn(Number.NEGATIVE_INFINITY)).toBe(0);
      expect(fn('-Infinity')).toBe(0);
    });

    it('returns 1 when invoked with 1', () => {
      expect(fn(1)).toBe(1);
      expect(fn(1n)).toBe(1);
      expect(fn('1')).toBe(1);
    });

    it('returns 1 when invoked with 1.5', () => {
      expect(fn(1.5)).toBe(1);
      expect(fn('1.5')).toBe(1);
    });

    it(`returns ${max} when invoked with Infinity`, () => {
      expect(fn(Number.POSITIVE_INFINITY)).toBe(max);
      expect(fn('Infinity')).toBe(max);
    });

    it(`returns ${max} when invoked with a number greater than Number.MAX_SAFE_INTEGER`, () => {
      const value = Number.MAX_SAFE_INTEGER * 2;
      expect(fn(value)).toBe(max);
      expect(fn(BigInt(value))).toBe(max);
      expect(fn(String(value))).toBe(max);
    });
  });
}

testLengthFn('toArrayLength', toArrayLength, 4294967295);

describe('toFiniteNumber()', () => {
  it('returns the fallback when invoked with a non-numeric value', () => {
    expect(toFiniteNumber(Number.NaN)).toBe(null);
    expect(toFiniteNumber('NaN')).toBe(null);
    expect(toFiniteNumber('Hello world!')).toBe(null);
    expect(toFiniteNumber({})).toBe(null);
  });

  it('returns -1 when invoked with -1', () => {
    expect(toFiniteNumber(-1)).toBe(-1);
    expect(toFiniteNumber(-1n)).toBe(-1);
    expect(toFiniteNumber('-1')).toBe(-1);
  });

  it('returns the fallback when invoked with -Infinity', () => {
    expect(toFiniteNumber(Number.NEGATIVE_INFINITY)).toBe(null);
    expect(toFiniteNumber('-Infinity')).toBe(null);
  });

  it('returns 1 when invoked with 1', () => {
    expect(toFiniteNumber(1)).toBe(1);
    expect(toFiniteNumber(1n)).toBe(1);
    expect(toFiniteNumber('1')).toBe(1);
  });

  it('returns 1.5 when invoked with 1.5', () => {
    expect(toFiniteNumber(1.5)).toBe(1.5);
    expect(toFiniteNumber('1.5')).toBe(1.5);
  });

  it('returns the fallback when invoked with Infinity', () => {
    expect(toFiniteNumber(Number.POSITIVE_INFINITY)).toBe(null);
    expect(toFiniteNumber('Infinity')).toBe(null);
  });

  it('returns the provided number when invoked with a number greater than Number.MAX_SAFE_INTEGER', () => {
    const value = Number.MAX_SAFE_INTEGER * 2;
    expect(toFiniteNumber(value)).toBe(value);
    expect(toFiniteNumber(BigInt(value))).toBe(value);
    expect(toFiniteNumber(String(value))).toBe(value);
  });
});

testLengthFn('toLength', toLength, 9007199254740991);

describe('toSafeInteger()', () => {
  it('returns the fallback when invoked with a non-numeric value', () => {
    expect(toSafeInteger(Number.NaN)).toBe(null);
    expect(toSafeInteger('NaN')).toBe(null);
    expect(toSafeInteger('Hello world!')).toBe(null);
    expect(toSafeInteger({})).toBe(null);
  });

  it('returns -1 when invoked with -1', () => {
    expect(toSafeInteger(-1)).toBe(-1);
    expect(toSafeInteger(-1n)).toBe(-1);
    expect(toSafeInteger('-1')).toBe(-1);
  });

  it('returns the fallback when invoked with -Infinity', () => {
    expect(toSafeInteger(Number.NEGATIVE_INFINITY)).toBe(null);
    expect(toSafeInteger('-Infinity')).toBe(null);
  });

  it('returns 1 when invoked with 1', () => {
    expect(toSafeInteger(1)).toBe(1);
    expect(toSafeInteger(1n)).toBe(1);
    expect(toSafeInteger('1')).toBe(1);
  });

  it('returns 1 when invoked with 1.5', () => {
    expect(toSafeInteger(1.5)).toBe(1);
    expect(toSafeInteger('1.5')).toBe(1);
  });

  it('returns the fallback when invoked with Infinity', () => {
    expect(toSafeInteger(Number.POSITIVE_INFINITY)).toBe(null);
    expect(toSafeInteger('Infinity')).toBe(null);
  });

  it('returns the fallback when invoked with a number greater than Number.MAX_SAFE_INTEGER', () => {
    const value = Number.MAX_SAFE_INTEGER * 2;
    expect(toSafeInteger(value)).toBe(null);
    expect(toSafeInteger(BigInt(value))).toBe(null);
    expect(toSafeInteger(String(value))).toBe(null);
  });
});

describe('toSafeIntegerOrInfinity()', () => {
  it('returns the fallback when invoked with a non-numeric value', () => {
    expect(toSafeIntegerOrInfinity(Number.NaN)).toBe(null);
    expect(toSafeIntegerOrInfinity('NaN')).toBe(null);
    expect(toSafeIntegerOrInfinity('Hello world!')).toBe(null);
    expect(toSafeIntegerOrInfinity({})).toBe(null);
  });

  it('returns -1 when invoked with -1', () => {
    expect(toSafeIntegerOrInfinity(-1)).toBe(-1);
    expect(toSafeIntegerOrInfinity(-1n)).toBe(-1);
    expect(toSafeIntegerOrInfinity('-1')).toBe(-1);
  });

  it('returns -Infinity when invoked with -Infinity', () => {
    expect(toSafeIntegerOrInfinity(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
    expect(toSafeIntegerOrInfinity('-Infinity')).toBe(Number.NEGATIVE_INFINITY);
  });

  it('returns 1 when invoked with 1', () => {
    expect(toSafeIntegerOrInfinity(1)).toBe(1);
    expect(toSafeIntegerOrInfinity(1n)).toBe(1);
    expect(toSafeIntegerOrInfinity('1')).toBe(1);
  });

  it('returns 1 when invoked with 1.5', () => {
    expect(toSafeIntegerOrInfinity(1.5)).toBe(1);
    expect(toSafeIntegerOrInfinity('1.5')).toBe(1);
  });

  it('returns Infinity when invoked with Infinity', () => {
    expect(toSafeIntegerOrInfinity(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
    expect(toSafeIntegerOrInfinity('Infinity')).toBe(Number.POSITIVE_INFINITY);
  });

  it('returns the fallback when invoked with a number greater than Number.MAX_SAFE_INTEGER', () => {
    const value = Number.MAX_SAFE_INTEGER * 2;
    expect(toSafeIntegerOrInfinity(value)).toBe(null);
    expect(toSafeIntegerOrInfinity(BigInt(value))).toBe(null);
    expect(toSafeIntegerOrInfinity(String(value))).toBe(null);
  });
});

describe('toStringNonNull()', () => {
  it('returns an empty string when invoked with null or undefined', () => {
    expect(toStringNonNull(null)).toBe('');
    expect(toStringNonNull(void 0)).toBe('');
  });

  it('returns the input string when invoked with a string', () => {
    const string = 'hello world';
    expect(toStringNonNull(string)).toBe(string);
  });

  it('returns the string representation of the bigint when invoked with a bigint', () => {
    expect(toStringNonNull(42n)).toBe('42');
  });

  it('returns the string representation of the boolean when invoked with a boolean', () => {
    expect(toStringNonNull(true)).toBe('true');
    expect(toStringNonNull(false)).toBe('false');
  });

  it('returns the string representation of the number when invoked with a number', () => {
    expect(toStringNonNull(0)).toBe('0');
    expect(toStringNonNull(-1)).toBe('-1');
    expect(toStringNonNull(1_337)).toBe('1337');
    expect(toStringNonNull(1.23e22)).toBe('1.23e+22');
    expect(toStringNonNull(Number.POSITIVE_INFINITY)).toBe('Infinity');
    expect(toStringNonNull(Number.NEGATIVE_INFINITY)).toBe('-Infinity');
    expect(toStringNonNull(Number.NaN)).toBe('NaN');
  });

  it('returns the string representation of the object when invoked with a object', () => {
    expect(toStringNonNull({})).toBe('[object Object]');
    expect(toStringNonNull({ toString() { return 'hello world' } })).toBe('hello world');
  });

  it('returns the string representation of the symbol when invoked with a symbol', () => {
    const description = 'hello world';
    expect(toStringNonNull(Symbol(description))).toBe(`Symbol(${description})`);
  });
});
