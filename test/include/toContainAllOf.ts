import type { MatcherState } from '@vitest/expect';

declare module 'vitest' {
  interface Assertion {
    toContainAllOf: (expected: Iterable<any>) => void;
  }
  interface AsymmetricMatchersContaining {
    toContainAllOf: (expected: Iterable<any>) => unknown;
  }
}

import { expect } from 'vitest';

function isIterable<T = unknown>(value: unknown): value is Iterable<T> {
  return value != null && typeof value[Symbol.iterator] === 'function';
}

expect.extend({
  toContainAllOf<T>(this: MatcherState, received: unknown, expected: Iterable<T>) {
    if (!isIterable<T>(expected)) {
      throw new TypeError('Expected value must be iterable');
    }
    if (!isIterable<T>(received)) {
      return {
        message: () => `expected ${this.utils.printReceived(received)} to be iterable`,
        pass: false,
      };
    }
    const expectedElements = Array.from(expected);
    const receivedElements = Array.from(received);
    let expectedIndex = expectedElements.length;
    while (--expectedIndex >= 0) {
      const expectedElement = expectedElements[expectedIndex];
      let found = false;
      let receivedIndex = receivedElements.length;
      while (--receivedIndex >= 0) {
        if (Object.is(receivedElements[receivedIndex], expectedElement)) {
          found = true;
          receivedElements.splice(receivedIndex, 1);
          break;
        }
      }
      if (!found) {
        return {
          message: () =>
            `expected ${this.utils.printReceived(received)} to contain ${
              this.utils.printExpected(expectedElement)
            }\n\n${this.utils.printDiffOrStringify(Array.from(expected), Array.from(received))}`,
          pass: false,
        };
      }
    }
    if (receivedElements.length) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(received)} not to contain ${
            this.utils.printReceived(receivedElements)
          }\n\n${this.utils.printDiffOrStringify(Array.from(expected), Array.from(received))}`,
        pass: false,
      };
    }
    return {
      message: () =>
        `expected ${this.utils.printReceived(received)} not to contain all the same elements as ${
          this.utils.printExpected(expected)
        }\n\n${this.utils.printDiffOrStringify(Array.from(expected), Array.from(received))}`,
      pass: true,
    };
  },
});
