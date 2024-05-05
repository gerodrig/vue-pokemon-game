import { GameStatus } from '@pokemon/interfaces';

describe('GameStatus Enum', () => {
  test('Should have a status of "playing"', () => {
    expect(GameStatus.Playing).toBe('playing');
  });

  test('Should have a status of "won"', () => {
    expect(GameStatus.Won).toBe('won');
  });

  test('Should have a status of "lost"', () => {
    expect(GameStatus.Lost).toBe('lost');
  });
});
