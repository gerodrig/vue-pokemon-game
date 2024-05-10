import { flushPromises } from '@vue/test-utils';
import MockAdapater from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { pokemonApi } from '@/modules/pokemon/api';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { withSetup } from '../../../utils/with-setup';
import { usePokemonGame } from '@/modules/pokemon/composables';

import { pokemonListDummyData } from '../../../data/dummy-pokemon';

//mocking the fetch call
const mockPokemonApi = new MockAdapater(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListDummyData,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('UsePokemonGame', async () => {
  test('Should initialize with the correct default values', async () => {
    const [results] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await flushPromises();

    // expect(results.isLoading.value).toBe(false);
    // expect(results.pokemonOptions.value.length).toBe(4);
    // expect(results.randomPokemon.value).toEqual({
    //     id: expect.any(Number),
    //     name: expect.any(String),
    // });
  });

  test('Should correctly handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('Should handle getNextRound correctly', async () => {
    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    const firstOptions = [...results.pokemonOptions.value].map((pokemon) => pokemon.name);

    results.getNextRound(); //4

    const secondOptions = [...results.pokemonOptions.value];

    secondOptions.forEach((pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name);
    });
  });

  test('Should handle an incorrect answer correctly', async () => {
    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);
    
    //? check answer
    checkAnswer(1000000);

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('Should handle a right answer correctly', async () => {
    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    const correctPokemon = results.randomPokemon.value;

    //? check answer
    checkAnswer(correctPokemon.id);

    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
        particleCount: expect.any(Number),
        spread: expect.any(Number),
        origin: { y: expect.any(Number) },
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
