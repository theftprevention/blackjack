<template>
  <ThreeTemplate :suit="Suit.HEARTS" />
</template>

<script setup lang="ts">
import { Suit } from '../game/suit';
import ThreeTemplate from './templates/ThreeTemplate.vue';
</script>
