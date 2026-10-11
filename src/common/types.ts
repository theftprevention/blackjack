/**
 * The type of the argument signature when invoking {@link Function.apply} on a
 * target function of type `T`.
 * @template T The type of the target function.
 */
export type ApplyParameters<T extends Function> = undefined extends ThisParameterType<T>
  ? 0 extends ToArrayLike<Parameters<T>>['length']
    ? [thisArg?: ThisParameterType<T>, args?: Readonly<Parameters<T>> | ToArrayLike<Parameters<T>>]
    : [thisArg: ThisParameterType<T>, args: Readonly<Parameters<T>> | ToArrayLike<Parameters<T>>]
  : [thisArg: ThisParameterType<T>, args: Readonly<Parameters<T>> | ToArrayLike<Parameters<T>>];

/**
 * A union of (a) the `number` type, and (b) the canonical array index keys (formatted as strings)
 * within an array type.
 * @template Array The type of the array whose indeces are extracted.
 */
export type ArrayIndex<Array extends readonly unknown[]> = {
  [Key in Extract<keyof Array, number | string>]: number extends Key
    ? Key
    : Key extends `${bigint}`
    ? `${bigint}` extends Key
      ? never
      : Key extends `-${string}` | `${WhiteSpace}${string}` | `${string}${WhiteSpace}`
      ? never
      : Key
    : never;
}[Extract<keyof Array, number | string>];

/**
 * Downgrades an array type to its corresponding array-like object type. The resulting type only
 * contains the `length` property and index properties from the original array type, and does not
 * extend `Array.prototype`.
 * @template Array The array type to convert.
 */
export type ArrayToArrayLike<Array extends readonly unknown[]> = {
  [K in ArrayIndex<Array> | 'length']: Array[K];
};

/**
 * A type that exposes a call signature, allowing it to be invoked as a function without the `new`
 * keyword.
 * @template Params The parameter types.
 * @template Return The return type.
 * @template This The context (`this`) type.
 */
export type Callable<Params extends readonly any[] = any, Return = any, This = any> = (
  this: This,
  ...args: Params
) => Return;

/**
 * The type of the argument signature when invoking {@link Function.call} on a
 * target function of type `T`.
 * @template T The type of the target function.
 */
export type CallParameters<T extends Function> =
  | [thisArg: ThisParameterType<T>, ...args: Parameters<T>]
  | (undefined extends ThisParameterType<T>
      ? 0 extends Parameters<T>['length']
        ? [thisArg?: ThisParameterType<T>, ...args: Parameters<T>]
        : never
      : never);

/**
 * A type that exposes an abstract construct signature, allowing it to be used as a superclass but
 * not necessarily allowing it to be invoked directly as a function with the `new` keyword.
 * @template Params The parameter types.
 * @template Return The return type.
 */
export type Constructible<
  Params extends readonly any[] = any,
  Return extends object = any
> = abstract new (...args: Params) => Return;

/**
 * Extract from `T` the types which declare at least one member whose key type is assignable from
 * `K`.
 * @template T The type that is filtered.
 * @template K The type of the property key.
 */
export type ExtractByKey<T, K extends PropertyKey> = T extends unknown
  ? K extends keyof T
    ? T
    : never
  : never;

/**
 * A union of the keys in `T` whose corresponding value types are assignable to {@link TValue}.
 * @template T The type from which the keys are extracted.
 * @template TValue The type to which the value types in `T` must be assignable.
 */
export type KeysAssignableTo<T, TValue> = {
  [K in Extract<keyof T, unknown>]-?: T[K] extends TValue ? K : never;
}[Extract<keyof T, unknown>];

/**
 * A union of the keys in `T` which represent methods (i.e. whose value types are non-nullable
 * callable types).
 *
 * @template T The type from which the keys are extracted.
 */
export type MethodKeys<T> = KeysAssignableTo<T, Callable>;

/**
 * The result of narrowing `T` to the types which declare at least one member whose key type is
 * assignable from `K`.
 *
 * @template T The type that is narrowed.
 * @template K The type of the property key.
 *
 * @remarks
 * When used in a type predicate, this type replicates the narrowing performed by the `in` operator,
 * but with a single caveat: the `in` operator produces a "false" branch containing both (a) the
 * types which don't contain a property with the specified key and (b) the types that have an
 * *optional property* with the specified key, whereas using this type as a type predicate produces
 * a "false" branch containing only the types that don't contain a property with the specified key.
 *
 * Given the following:
 *
 * ```ts
 * interface Bird { fly(): void }
 * interface Fish { swim(): void }
 * interface Human { fly?(): void; swim?(): void }
 *
 * declare const animals: (Bird | Fish | Human)[];
 *
 * function* getNonSwimmers() {
 *   for (const animal of animals) {
 *     if (!isSwimmer(animal)) {
 *       yield animal;
 *     }
 *   }
 * }
 * const nonSwimmers = Array.from(getNonSwimmers());
 * ```
 *
 * In the example above, the elements of the `nonSwimmers` array are inferred to be of the type
 * `Bird | Human`. This makes sense, because while we know that a `Bird` can't respond to the
 * `swim()` command, it's also possible for a `Human` to be incapable of responding to the command
 * (if its `swim` property is `undefined`).
 *
 * However, if the `getNonSwimmers()` implementation is changed to the following:
 *
 * ```ts
 * function* getNonSwimmers() {
 *   for (const animal of animals) {
 *     if (!isSwimmer(animal)) {
 *       yield animal;
 *     }
 *   }
 * }
 * function isSwimmer(animal: Bird | Fish | Human): animal is NarrowByKey<typeof animal, 'swim'> {
 *   return 'swim' in animal;
 * }
 * ```
 *
 * ...then the elements of the `nonSwimmers` array are instead inferred to be of the type `Bird`.
 * This is because type predicates operate with mutual exclusivity; each constituent type that is
 * subjected to a type predicate is placed in either the "true" branch or the "false" branch, and
 * there's no way for a type predicate to imply that a contituent type should be placed in both.
 */
export type NarrowByKey<T, K extends PropertyKey> = [ExtractByKey<T, K>] extends [never]
  ? T & { +readonly [M in K]+?: M extends keyof T ? T[M] : unknown }
  : ExtractByKey<T, K>;

/**
 * Exclude from `T` the types which are assignable to `null` or `undefined`.
 * @template T The type from which empty types are excluded.
 */
/* eslint-disable @typescript-eslint/ban-types */
export type NonEmpty<T = {} | null | undefined> = Exclude<T, null | void>;
/* eslint-enable @typescript-eslint/ban-types */

/**
 * The argument list tuple type that corresponds to the call signature of type `T`, if `T`
 * is a callable type.
 *
 * This type differs from the built-in `Parameters` type in that the type parameter `T`
 * has no constraint.
 *
 * @template T The type whose call signature argument list type is derived.
 */
export type Parameters<T> = T extends (...a: infer Params) => any
  ? Params
  : T extends Function
  ? unknown[]
  : never;

/**
 * The return type of `T`, if `T` is a callable type.
 *
 * This type differs from the built-in `ReturnType` type in that
 * 1. the type parameter `T` has no constraint, and
 * 2. `never` is replaced with the `Fallback` type argument.
 *
 * @template T The type whose return type is derived.
 * @template Fallback The type that is resolved if `T` is not a function type.
 */
export type ReturnType<T, Fallback = never> = unknown extends T
  ? T
  : T extends Callable<any, infer Return>
  ? Return
  : T extends Function
  ? unknown
  : Fallback;

/**
 * Converts `T` to an equivalent array-like type.
 * @template T The type to convert.
 * @template Empty An optional type to union with the resulting array-like type if it can contain zero elements.
 */
export type ToArrayLike<T, Empty = never> = unknown extends T
  ? ArrayLike<T>
  : T extends readonly any[]
  ? ArrayToArrayLike<T> | (0 extends T['length'] ? Empty : never)
  : T extends ArrayLike<any>
  ? T | (0 extends T['length'] ? Empty : never)
  : never;

/**
 * The `this` parameter type of `T`, if `T` is a callable or constructible type.
 *
 * This type differs from the built-in `ThisParameterType` type in that
 * 1. it also works on constructor signatures, and
 * 2. it resolves to `never` if `T` is not a `Function` type.
 *
 * @template T The type whose return type is derived.
 */
export type ThisParameterType<T> = T extends Callable | Constructible
  ?
      | (T extends Callable<any, any, infer This> ? This : never)
      | (T extends Constructible<any, infer This> ? This : never)
  : T extends Function
  ? unknown
  : never;

/**
 * The union of Unicode code units which are removed as part of the ECMAScript [TrimString](1)
 * abstract operation.
 *
 * [1]: https://tc39.es/ecma262/multipage/text-processing.html#sec-trimstring
 */
export type WhiteSpace =
  | '\t'
  | '\n'
  | '\v'
  | '\f'
  | '\r'
  | '\u0020'
  | '\u00A0'
  | '\u1680'
  | '\u2000'
  | '\u2001'
  | '\u2002'
  | '\u2003'
  | '\u2004'
  | '\u2005'
  | '\u2006'
  | '\u2007'
  | '\u2008'
  | '\u2009'
  | '\u200A'
  | '\u2028'
  | '\u2029'
  | '\u202F'
  | '\u205F'
  | '\u3000'
  | '\uFEFF';
