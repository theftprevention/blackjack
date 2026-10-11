function shuffle<T, Output extends T[] = T[]>(input: readonly T[], output: Output): Output {
  const count = input.length;
  if (count > 1) {
    const remaining = input.slice();
    let inputIndex: number;
    let outputIndex = 0;
    do {
      inputIndex = Math.floor(Math.random() * remaining.length);
      output[outputIndex++] = remaining[inputIndex];
      remaining.splice(inputIndex, 1);
    } while (remaining.length > 1);
    output[outputIndex] = remaining[0];
  } else if (output !== input && count) {
    output[0] = input[0];
  }
  output.length = count;
  return output;
}

/**
 * Returns a new array created by shuffling the order of the elements within in input array.
 * @template T The type of the elements in the {@link array}.
 * @param array The array whose elements will be shuffled. This array is not mutated.
 * @returns A new array containing all of the same elements as the input {@link array}, but in a randomized order.
 */
export function shuffleCopy<T>(array: readonly T[]): T[] {
  return shuffle<T>(array, []);
}

/**
 * Randomizes the order of the elements in an array in-place.
 * @template A The type of the input {@link array}.
 * @param array The array whose elements will be shuffled. This array is mutated.
 * @returns The input {@link array}.
 */
export function shuffleInPlace<A extends unknown[]>(array: A): A {
  return shuffle(array, array);
}
