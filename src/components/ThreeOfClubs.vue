<template>
  <ThreeTemplate :suit="Suit.CLUBS" />
</template>

<script setup lang="ts">
import { Suit } from '../game/suit';
import ThreeTemplate from './templates/ThreeTemplate.vue';
</script>
