import { describe, expect, it } from 'vitest';
import { Player } from '../../../src/game/player';

describe('Player', () => {
  it('has the correct properties', () => {
    const name = 'Test Player'
    const card = new Player(name);
    expect(card).toHaveProperty('name', name);
  });

  it('is read-only', () => {
    const player = new Player('Test Player');
    expect(() => { (player as any).name = 'hello world' }).toThrow();
  });

  describe('constructor', () => {
    it('does not throw an error when no arguments are provided', () => {
      expect(() => new (Player as any)()).not.toThrow();
    });
  });
});
