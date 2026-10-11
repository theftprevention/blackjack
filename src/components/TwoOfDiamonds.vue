<template>
  <TwoTemplate :suit="Suit.DIAMONDS" />
</template>

<script setup lang="ts">
import { Suit } from '../game/suit';
import TwoTemplate from './templates/TwoTemplate.vue';
</script>
