import { describe, expect, it } from 'vitest';
import '../../include/toContainAllOf';
import { shuffleCopy, shuffleInPlace } from '../../../src/game/shuffle';

describe('shuffleCopy()', () => {
  it('returns a copy of the source array containing all of the same elements', () => {
    const source = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const shuffled = shuffleCopy(source);
    expect(shuffled).not.toBe(source);
    expect(shuffled).toContainAllOf(source);
  });
});

describe('shuffleInPlace()', () => {
  it('returns the source array containing all of the same elements', () => {
    const source = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const sourceCopy = source.slice();
    const shuffled = shuffleInPlace(source);
    expect(shuffled).toBe(source);
    expect(shuffled).toContainAllOf(sourceCopy);
  });
});
