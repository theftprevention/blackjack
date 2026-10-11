<template>
  <svg
    viewBox="0 0 635 889"
    xmlns="http://www.w3.org/2000/svg"
    width="635"
    :class="['card', rank.singularName, suit.pluralName]"
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

    <g class="card-fill">
      <g :id="topLeftId">
        <text
          x="50"
          y="90"
          font-size="90"
          font-weight="500"
          text-anchor="middle"
          textLength="100"
          lengthAdjust="spacing"
        >
          <tspan>{{ rank.symbol }}</tspan>
          <tspan x="50" dy="0.9em" font-size="110">{{ suit.symbol }}</tspan>
        </text>
      </g>

      <use :href="`#${topLeftId}`" style="transform-origin: 50% 50%; transform: rotate(180deg);" />

      <slot v-bind="{ slug, symbol: suit.symbol }" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Rank } from '../../game/rank';
import { Suit } from '../../game/suit';

const props = defineProps({
  rank: {
    type: Rank,
    required: true,
  },
  suit: {
    type: Suit,
    required: true,
  },
});

const slug = computed(() => `${props.rank.singularName}-of-${props.suit.pluralName}`);
const topLeftId = computed(() => `${slug.value}-topleft`);
</script>

<style>
.card {
  aspect-ratio: 5 / 7;
  user-select: none;
  border: 0px solid transparent;
}

.card text {
  cursor: default;
}

.card-fill {
  fill: #000;
}

.card.diamonds .card-fill,
.card.hearts .card-fill {
  fill: #d12d36;
}
</style>
