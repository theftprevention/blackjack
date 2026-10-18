<template>
  <template v-for="card in cardComponents">
    <component :is="card" />
  </template>
</template>

<script setup lang="ts">
import * as cardComponentsDictionary from './components/cards';

type CardComponent = (typeof cardComponentsDictionary)[CardComponentName];
type CardComponentName = keyof typeof cardComponentsDictionary;

const cardComponents: CardComponent[] = [];
for (const key of Reflect.ownKeys(cardComponentsDictionary) as CardComponentName[]) {
  cardComponents.push(cardComponentsDictionary[key]);
}
Object.freeze(cardComponents);
</script>
