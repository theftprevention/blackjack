import type { ExtractPropTypes } from 'vue';

import { computed, toRef } from 'vue';
import { Rank, Suit } from '../../../game';

export const cardFaceProps = Object.freeze({
  rank: Object.freeze({
    type: Rank,
    required: true,
  }),
  slug: Object.freeze({
    type: String,
    required: true,
  }),
  suit: Object.freeze({
    type: Suit,
    required: true,
  }),
});

export function useCardFace(props: ExtractPropTypes<typeof cardFaceProps>) {
  const rank = toRef(props, 'rank');
  const suit = toRef(props, 'suit');
  return {
    rank,
    suit,
    symbol: computed(() => suit.value.symbol),
  };
}
