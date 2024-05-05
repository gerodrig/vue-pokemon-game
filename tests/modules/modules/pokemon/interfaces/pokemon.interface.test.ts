import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('Pokemon Interface', () => {
  const pokemon: Pokemon = { id: 25, name: 'pikachu' };

  console.log(pokemon);

  test('Should have an id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  test('Should have a name property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
