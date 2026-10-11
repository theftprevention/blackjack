<template>
  <TwoTemplate :suit="Suit.HEARTS" />
</template>

<script setup lang="ts">
import { Suit } from '../game/suit';
import TwoTemplate from './templates/TwoTemplate.vue';
</script>
