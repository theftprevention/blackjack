<template>
  <FourTemplate :suit="Suit.HEARTS" />
</template>

<script setup lang="ts">
import { Suit } from '../game/suit';
import FourTemplate from './templates/FourTemplate.vue';
</script>
