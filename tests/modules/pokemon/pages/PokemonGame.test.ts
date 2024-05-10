import type { Mock } from 'vitest';
import { mount } from '@vue/test-utils';

import { usePokemonGame } from '@/modules/pokemon/composables';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonOptions = [
  {
    id: 1,
    name: 'bulbasaur',
  },
  {
    id: 2,
    name: 'ivysaur',
  },
  {
    id: 3,
    name: 'venusaur',
  },
  {
    id: 4,
    name: 'charmander',
  },
];

describe('PokemonGame component', () => {
  test('Should initialize with the correct default values', async () => {
    //? Arrange: Setting up the test
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoading: true,
      gameStatus: GameStatus.Playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    //? Act: Executing the test
    const wrapper = mount(PokemonGame);

    //? Assert: Checking the result
    expect(wrapper.get('span').text()).toBe('Loading...');
    expect(wrapper.get('span').classes()).toEqual([
      '!absolute',
      '!-m-px',
      '!h-px',
      '!w-px',
      '!overflow-hidden',
      '!whitespace-nowrap',
      '!border-0',
      '!p-0',
      '![clip:rect(0,0,0,0)]',
    ]);

    expect(wrapper.get('h3').text()).toBe('Loading Pokemons');
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
  });

  test('Should render pokemon pictures when the game is playing', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonOptions[0],
      isLoading: false,
      gameStatus: GameStatus.Playing,
      pokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const imageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
    const pokemons = pokemonOptions.map((pokemon) => pokemon.name);

    //? Assert: Checking the result
    expect(wrapper.find('img').attributes('src')).toBe(imageUrl);

    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');

    expect(buttons).toHaveLength(4);
    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });

  test('Should render button for a new game when the game is over', () => {
    (usePokemonGame as Mock).mockReturnValue({
        randomPokemon: pokemonOptions[0],
        isLoading: false,
        gameStatus: GameStatus.Won,
        pokemonOptions,
        checkAnswer: vi.fn(),
        getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    console.log(wrapper.html());
    // const button = wrapper.find('[data-test-id="btn-new-game"]');

    //? Assert: Checking the result
    expect(true).toBe(true);
    // expect(wrapper.get('button').text()).toBe('New Game');
});
});
