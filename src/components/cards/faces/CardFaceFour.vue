<template>
  <g>
    <g :id="`${slug}-top`">
      <text x="30%" y="25%" font-size="200" text-anchor="middle" dominant-baseline="middle">
        {{ symbol }}
      </text>
      <text x="70%" y="25%" font-size="200" text-anchor="middle" dominant-baseline="middle">
        {{ symbol }}
      </text>
    </g>
    <use :href="`#${slug}-top`" style="transform-origin: 50% 50%; transform: rotate(180deg);" />
  </g>
</template>

<script setup lang="ts">
import { cardFaceProps, useCardFace } from './useCardFace';

const props = defineProps(cardFaceProps);
const { slug, symbol } = useCardFace(props);
</script>
