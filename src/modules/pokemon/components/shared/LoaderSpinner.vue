<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div
      :class="[
        'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]',
        `${props.color}`
      ]"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
    <h3 v-if="props.text" class="animate-pulse">Loading Pokemons</h3>
  </div>
</template>

<script setup lang="ts">
import { Colors } from '../../interfaces/colors.enum'

type Props = {
  text: string | null
  color?: Colors
}

const props = withDefaults(defineProps<Props>(), {
  text: null,
  color: Colors.red
})
</script>
