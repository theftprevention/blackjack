<template>
  <TwoTemplate :suit="Suit.SPADES" />
</template>

<script setup lang="ts">
import { Suit } from '../game/suit';
import TwoTemplate from './templates/TwoTemplate.vue';
</script>
