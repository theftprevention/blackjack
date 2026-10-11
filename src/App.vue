<template>
  <div>
    <Card v-model="card" />
  </div>
</template>

<script setup lang="ts">
import Card from './components/Card.vue';
import { Card as CardModel } from './game/card'
import { Rank } from './game/rank'
import { Suit } from './game/suit'

const card = new CardModel(Rank.KING, Suit.HEARTS);
</script>
