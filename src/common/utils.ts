import type {
  ApplyParameters,
  Callable,
  CallParameters,
  Constructible,
  NarrowByKey,
  NonEmpty,
  ReturnType,
} from './types';

export const {
  Array,
  Error,
  Function,
  Math,
  Number,
  Object,
  RangeError,
  Reflect,
  Set,
  String,
  TypeError,
  WeakMap,
} = globalThis;

export const {
  from: arrayFrom,
  isArray,
  prototype: arrayPrototype,
} = Array;

export const {
  prototype: functionPrototype,
} = Function;

export const {
  apply: functionPrototypeApply,
  bind: functionPrototypeBind,
  call: functionPrototypeCall,
} = functionPrototype;

export const {
  ceil,
  log2,
  max,
  min,
  pow,
  trunc,
} = Math;

export const MAX_ARRAY_LENGTH = 4294967295;
export const MAX_LENGTH = 9007199254740991;
export const {
  POSITIVE_INFINITY,
  NEGATIVE_INFINITY,
} = Number;

export const {
  assign,
  create,
  defineProperties,
  freeze,
  getOwnPropertyDescriptors,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  prototype: objectPrototype,
  seal,
} = Object;

export const {
  apply,
  construct,
  defineProperty,
  deleteProperty,
  get,
  getOwnPropertyDescriptor,
  getPrototypeOf,
  has,
  isExtensible,
  ownKeys,
  preventExtensions,
  set,
  setPrototypeOf,
} = Reflect as (typeof Reflect & {
  apply: {
    <Params extends readonly any[], Return, This>(
      fn: Callable<Params, Return, This>,
      thisArg: This,
      args: Readonly<Params>
    ): Return;
    <T extends Function>(fn: T, ...args: ApplyParameters<T>): ReturnType<T>;
  };
});

export const {
  prototype: weakMapPrototype,
} = WeakMap;

export const bind = apply(functionPrototypeBind, functionPrototypeCall, [
  functionPrototypeBind,
]) as {
  (fn: Function, thisArg?: unknown, ...args: unknown[]): Callable & Constructible;

  <T extends Callable | Constructible = Callable & Constructible>(
    fn: Function,
    thisArg?: unknown,
    ...args: unknown[]
  ): T;
};

export const call = bind(functionPrototypeCall, functionPrototypeCall) as {
  <T extends Function>(fn: T, ...args: CallParameters<T>): ReturnType<T>;
};

export const bindApply = bind(functionPrototypeBind, functionPrototypeApply) as {
  (fn: Function, thisArg?: unknown, args?: ArrayLike<unknown> | null): Callable & Constructible;

  <T extends Callable | Constructible = Callable & Constructible>(
    fn: Function,
    thisArg?: unknown,
    args?: ArrayLike<unknown> | null
  ): T;
};

export const bindCall = bind(functionPrototypeBind, functionPrototypeCall) as {
  (fn: Function, thisArg?: unknown, ...args: unknown[]): Callable & Constructible;

  <T extends Callable | Constructible = Callable & Constructible>(
    fn: Function,
    thisArg?: unknown,
    ...args: unknown[]
  ): T;
};

export function capitalize<T extends string>(value: T): Capitalize<T>;
export function capitalize(value: string): string {
  return value.length > 1
    ? `${value[0].toUpperCase()}${value.slice(1)}`
    : value;
}

export function getOwnOrInheritedPropertyDescriptor<Target extends object, Key extends PropertyKey>(
  target: Target,
  key: Key
): TypedPropertyDescriptor<Key extends keyof Target ? Target[Key] : unknown> | undefined {
  let descriptor: TypedPropertyDescriptor<Key extends keyof Target ? Target[Key] : unknown> | undefined;
  let prototype: object | null = target;
  do {
    descriptor = getOwnPropertyDescriptor(prototype, key) as typeof descriptor;
  } while (!descriptor && (prototype = getPrototypeOf(prototype)));
  return descriptor;
}

export const hasOwnProperty = bindCall<{
  <Target extends NonEmpty, Key extends keyof Target>(target: Target, key: Key): boolean;
  <Target extends NonEmpty, Key extends PropertyKey>(
    target: Target,
    key: Key
  ): target is NarrowByKey<Target, Key>;
}>(objectPrototype.hasOwnProperty);

function toLengthInternal(max: number, value: unknown): number {
  if (typeof value === 'symbol') {
    return 0;
  }
  const length = Number(value);
  return length > max ? max : length > 0 ? trunc(length) : 0;
}

export const toArrayLength: (value: unknown) => number =
  bind(toLengthInternal, void 0, MAX_ARRAY_LENGTH);

export function toFiniteNumber(value: unknown): number | null;
export function toFiniteNumber<Fallback>(
  value: unknown,
  fallback: Fallback,
  minimum?: number
): number | Fallback;
export function toFiniteNumber<Fallback>(
  value: unknown,
  fallback: Fallback = null as Fallback,
  minimum: number = NEGATIVE_INFINITY
): number | Fallback {
  const number = Number(value);
  return Number.isFinite(number)
    ? number > minimum
      ? number
      : minimum
    : fallback;
}

export const toLength: (value: unknown) => number = bind(toLengthInternal, void 0, MAX_LENGTH);

export function toSafeInteger(value: unknown): number | null;
export function toSafeInteger<Fallback>(
  value: unknown,
  fallback: Fallback,
  minimum?: number
): number | Fallback;
export function toSafeInteger<Fallback>(
  value: unknown,
  fallback: Fallback = null as Fallback,
  minimum: number = NEGATIVE_INFINITY
): number | Fallback {
  const integer = Math.trunc(Number(value));
  return Number.isSafeInteger(integer)
    ? integer > minimum
      ? integer
      : minimum
    : fallback;
}

export function toSafeIntegerOrInfinity(value: unknown): number | null;
export function toSafeIntegerOrInfinity<Fallback>(
  value: unknown,
  fallback: Fallback,
  minimum?: number
): number | Fallback;
export function toSafeIntegerOrInfinity<Fallback>(
  value: unknown,
  fallback: Fallback = null as Fallback,
  minimum: number = NEGATIVE_INFINITY
): number | Fallback {
  const number = Math.trunc(Number(value));
  return (Number.isSafeInteger(number) || number === POSITIVE_INFINITY || number === NEGATIVE_INFINITY)
    ? number > minimum
      ? number
      : minimum
    : fallback;
}

export function toStringNonNull(value: unknown): string {
  return value == null ? '' : String(value);
}
