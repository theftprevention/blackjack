import { describe, expect, it } from 'vitest';
import { ReadonlyArray } from '../../../src/common/readonlyArray';

describe('ReadonlyArray', () => {
  it('returns the same length as the source array', () => {
    const array = ['a', 'b'];
    expect(new ReadonlyArray(array).length).toBe(array.length);
  });

  it('throws an error when its length property is assigned', () => {
    expect(() => { (new ReadonlyArray([]) as any).length = 1; }).toThrow();
  });

  it('throws an error when Object.defineProperty() is used to define a length property', () => {
    expect(() => {
      Object.defineProperty(new ReadonlyArray([]), 'length', {
        configurable: true,
        enumerable: false,
        value: 1,
        writable: true,
      })
    }).toThrow();
  });

  it('returns the same element as the source array for each index', () => {
    const array = ['a', 'b'];
    const copy = new ReadonlyArray(array);
    let index = 0;
    const { length } = array;
    do {
      expect(copy[index]).toBe(array[index]);
    } while (++index < length);
  });

  it('throws an error when any index property is assigned', () => {
    expect(() => { (new ReadonlyArray([]) as any)[0] = 'a'; }).toThrow();
    expect(() => { (new ReadonlyArray([]) as any)[1] = 'a'; }).toThrow();
    expect(() => { (new ReadonlyArray([]) as any)[4294967295] = 'a'; }).toThrow();
  });

  it('allows the assignment of non-array properties', () => {
    const value = 'a';
    for (const key of ['abc', '01', '-1']) {
      const array = new ReadonlyArray([]);
      array[key] = value;
      expect(array[key]).toBe(value);
    }
  });

  it('throws an error when Object.defineProperty() is used to define an index property', () => {
    const descriptor = {
      configurable: false,
      enumerable: true,
      value: 'a',
      writable: true,
    };
    expect(() => Object.defineProperty(new ReadonlyArray([]), 0, descriptor)).toThrow();
    expect(() => Object.defineProperty(new ReadonlyArray([]), 1, descriptor)).toThrow();
    expect(() => Object.defineProperty(new ReadonlyArray([]), 4294967295, descriptor)).toThrow();
  });

  it('allows the use of Object.defineProperty() to define non-array properties', () => {
    const value = 'a';
    const descriptor = {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    };
    for (const key of ['abc', '01', '-1']) {
      const array = new ReadonlyArray([]);
      Object.defineProperty(array, key, descriptor);
      expect(array[key]).toBe(value);
    }
  });

  it('yields the same elements as the source array when iterated', () => {
    const array = ['a', 'b'];
    const arrayIterator = array[Symbol.iterator]();
    const copyIterator = new ReadonlyArray(array)[Symbol.iterator]();
    let arrayElement: IteratorResult<string>;
    let copyElement: IteratorResult<string>;
    do {
      arrayElement = arrayIterator.next();
      copyElement = copyIterator.next();
      expect(copyElement).toEqual(arrayElement);
    } while (!arrayElement.done);
  });

  it('reports the same own property keys as the source array', () => {
    const array = ['a', 'b', 'c'];
    const copy = new ReadonlyArray(array);
    expect(Reflect.ownKeys(copy)).toEqual(Reflect.ownKeys(array));
    expect(Object.getOwnPropertyNames(copy)).toEqual(Object.getOwnPropertyNames(array));
    expect(Object.getOwnPropertySymbols(copy)).toEqual(Object.getOwnPropertySymbols(array));
  });

  it('reports the existence of all of the same property keys as the source array', () => {
    function getAllKeys(target: object): Set<string | symbol> {
      const keys = new Set<string | symbol>();
      let prototype: object | null = target;
      do {
        for (const key of Reflect.ownKeys(prototype)) {
          keys.add(key);
        }
        prototype = Reflect.getPrototypeOf(prototype);
      } while (prototype);
      return keys;
    }

    const array = ['a', 'b', 'c'];
    const arrayKeys = getAllKeys(array);

    const copy = new ReadonlyArray(array);
    for (const key of arrayKeys) {
      if (!(key in copy)) {
        throw new Error(`ReadonlyArray is missing key '${String(key)}'`);
      }
    }

    for (const key of getAllKeys(copy)) {
      if (!arrayKeys.has(key)) {
        throw new Error(`ReadonlyArray contains an unexpected key '${String(key)}'`);
      }
    }
  });

  it('is recognized as an array by the Array.isArray() method', () => {
    expect(Array.isArray(new ReadonlyArray([]))).toBe(true);
  });

  it('is recognized as an array by the Array[Symbol.hasInstance]() method', () => {
    expect(new ReadonlyArray([])).toBeInstanceOf(Array);
  });

  it('reflects changes to the source array', () => {
    const array = ['a', 'b'];
    const copy = new ReadonlyArray(array);
    expect(copy.length).toBe(2);
    array.push('c');
    expect(copy.length).toBe(3);
    expect(copy[2]).toBe('c');
    array.shift();
    expect(copy.length).toBe(2);
    expect(copy[0]).toBe('b');
  });

  describe('wrapper around an array-like object', () => {
    it('returns the normalized length derived from the source object', () => {
      const array = { 0: 'a', '01': 'b', 2: 'c', length: '3' };
      expect(new ReadonlyArray(array).length).toBe(3);
    });
  
    it('returns the same element as the source object for each index', () => {
      const array = { 0: 'a', '01': 'b', 2: 'c', length: '3' };
      const copy = new ReadonlyArray(array);
      let index = 0;
      const { length } = copy;
      do {
        expect(copy[index]).toBe(array[index]);
      } while (++index < length);
    });
  
    it('yields the same elements as the source object when iterated', () => {
      const array = { 0: 'a', '01': 'b', 2: 'c', length: '3' };
      const arrayIterator = Array.prototype[Symbol.iterator].call(array);
      const copyIterator = new ReadonlyArray(array)[Symbol.iterator]();
      let arrayElement: IteratorResult<string>;
      let copyElement: IteratorResult<string>;
      do {
        arrayElement = arrayIterator.next();
        copyElement = copyIterator.next();
        expect(copyElement).toEqual(arrayElement);
      } while (!arrayElement.done);
    });

    it('reflects changes to the source object', () => {
      const array: { [index: number]: unknown; length?: unknown } = { 0: 'a', 1: 'b', length: '2' };
      const copy = new ReadonlyArray(array);
      expect(copy.length).toBe(2);
      Array.prototype.push.call(array, 'c');
      expect(copy.length).toBe(3);
      expect(copy[2]).toBe('c');
      Array.prototype.shift.call(array);
      expect(copy.length).toBe(2);
      expect(copy[0]).toBe('b');
    });
  });
});
