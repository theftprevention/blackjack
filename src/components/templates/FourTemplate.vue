<template>
  <CardTemplate :rank="Rank.FOUR" :suit="suit" v-slot="{ slug, symbol }">
    <g :id="`${slug}-top`">
      <text x="30%" y="25%" font-size="200" text-anchor="middle" dominant-baseline="middle">
        {{ symbol }}
      </text>
      <text x="70%" y="25%" font-size="200" text-anchor="middle" dominant-baseline="middle">
        {{ symbol }}
      </text>
    </g>
    <use :href="`#${slug}-top`" style="transform-origin: 50% 50%; transform: rotate(180deg);" />
  </CardTemplate>
</template>

<script setup lang="ts">
import { Rank } from '../../game/rank';
import { Suit } from '../../game/suit';
import CardTemplate from './CardTemplate.vue';

defineProps({
  suit: {
    type: Suit,
    required: true,
  },
});
</script>
