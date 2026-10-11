<template>
  <svg
    viewBox="0 0 635 889"
    xmlns="http://www.w3.org/2000/svg"
    style="max-width: 100vw; max-height: 100vh;"
    width="635"
    :class="[model.name, 'card']"
  >
    <rect
      x="0"
      y="0"
      fill="#fff"
      width="635"
      height="889"
      stroke-width="0"
      rx="35"
      ry="35"
    />

    <g :fill="color">
      <g id="topleft">
        <text
          x="70"
          y="136"
          font-size="116"
          font-weight="500"
          text-anchor="middle"
          textLength="100"
          lengthAdjust="spacing"
        >
          {{ rank.symbol }}
        </text>
        <text x="30" y="236" font-size="126">
          {{ suit.symbol }}
        </text>
      </g>

      <use href="#topleft" style="transform-origin: 50% 50%; transform: rotate(180deg);" />

      <text x="50%" y="50%" font-size="280" text-anchor="middle" dominant-baseline="middle">
        {{ suit.symbol }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card } from '../game/card';
import { Suit } from '../game/suit';

const model = defineModel('modelValue', {
  type: Card,
  required: true,
});

const rank = computed(() => model.value.rank);
const suit = computed(() => model.value.suit);

const color = computed(() => {
  switch (suit.value) {
    case Suit.DIAMONDS:
    case Suit.HEARTS:
      return '#d12d36';
    default:
      return '#000';
  }
});
</script>

<style>
.card {
  aspect-ratio: 5 / 7;
  user-select: none;
}

.card text {
  cursor: default;
}
</style>
