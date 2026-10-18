<template>
  <g>
    <g :id="`${slug}-top`">
      <text x="50%" y="25%" font-size="240" text-anchor="middle" dominant-baseline="middle">
        {{ symbol }}
      </text>
    </g>
    <text x="50%" y="50%" font-size="240" text-anchor="middle" dominant-baseline="middle">
      {{ symbol }}
    </text>
    <use :href="`#${slug}-top`" style="transform-origin: 50% 50%; transform: rotate(180deg);" />
  </g>
</template>

<script setup lang="ts">
import { cardFaceProps, useCardFace } from './useCardFace';

const props = defineProps(cardFaceProps);
const { slug, symbol } = useCardFace(props);
</script>
