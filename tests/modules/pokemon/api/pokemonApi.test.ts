import { pokemonApi } from '@pokemon/api/pokemonApi';

describe('pokemonApi', () => {
  it('Api should be configured correctly', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
  });
});
