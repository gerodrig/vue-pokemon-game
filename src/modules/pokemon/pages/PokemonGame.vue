<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center w-screen h-screen"
  >
    <LoadingSpinner text="Loading Pokemons" />
  </section>

  <section v-else class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="m-5">Who's That Pokémon?</h1>

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="p-2 text-white transition-all bg-red-500 rounded-md hover:bg-red-700"
      >
        Play again?
      </button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script lang="ts" setup>
import LoadingSpinner from '@pokemon/components/shared/LoaderSpinner.vue';
import PokemonPicture from '@pokemon/components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '@pokemon/composables/usePokemonGame';
import { GameStatus } from '@pokemon/interfaces/game-status.enum';

const {
  gameStatus,
  isLoading,
  pokemonOptions: options,
  randomPokemon,
  getNextRound,
  checkAnswer,
} = usePokemonGame();
</script>
