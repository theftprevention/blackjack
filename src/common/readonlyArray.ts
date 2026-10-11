import {
  apply,
  Array,
  arrayPrototype,
  bind,
  call,
  create,
  defineProperties,
  defineProperty,
  deleteProperty,
  get,
  getOwnOrInheritedPropertyDescriptor,
  getOwnPropertyDescriptor,
  getOwnPropertyDescriptors,
  has,
  hasOwnProperty,
  isExtensible,
  ownKeys,
  set,
  toArrayLength,
  weakMapPrototype,
} from './utils';

interface ArrayLike<T = any> {
  readonly [index: number]: T | undefined;
  readonly length?: unknown;
}

const sources = new WeakMap<ReadonlyArray, ArrayLike>();
const getSource: <T>(readonlyArray: ReadonlyArray<T>) => ArrayLike<T> | undefined =
  bind(weakMapPrototype.get, sources) as any;
const setSource: <T>(readonlyArray: ReadonlyArray<T>, source: ArrayLike<T>) => typeof sources =
  bind(weakMapPrototype.set, sources) as any;

function getLength(target: { length?: unknown } | null | undefined): number {
  return target == null ? 0 : getLengthNonNull(target);
}

function getLengthNonNull(target: { length?: unknown }): number {
  return isNativeArray(target) ? target.length : toArrayLength(target.length);
}

function isIndex(key: string): key is `${bigint}` {
  return toIndex(key) !== null;
}

function toIndex(key: string): number | null {
  const index = Number(key);
  return Number.isInteger(index) && index >= 0 && String(index) === key ? index : null;
}

const isNativeArray = Array.isArray;

const lengthDescriptor: PropertyDescriptor = Object.freeze<PropertyDescriptor & { __proto__: any }>({
  __proto__: null,
  configurable: false,
  enumerable: false,
  get<T>(this: ReadonlyArray<T>): number {
    return getLength(getSource(this));
  },
  set: void 0,
});

const proxyHandler: ProxyHandler<any[]> = Object.freeze<ProxyHandler<any[]> & { __proto__: any }>({
  __proto__: null,
  defineProperty(target, key, descriptor) {
    return (typeof key !== 'string' || !isIndex(key)) && defineProperty(target, key, descriptor);
  },
  deleteProperty(target, key) {
    return (typeof key !== 'string' || !isIndex(key)) && deleteProperty(target, key);
  },
  get(target, key, receiver) {
    if (typeof key === 'string') {
      const index = toIndex(key);
      if (index !== null) {
        const source = getSource(target);
        if (source && index < getLengthNonNull(source)) {
          return source[index];
        }
      }
    }
    return get(target, key, receiver);
  },
  getOwnPropertyDescriptor(target, key) {
    if (typeof key === 'string') {
      const index = toIndex(key);
      if (index !== null) {
        const source = getSource(target);
        if (source && index < getLengthNonNull(source)) {
          return isExtensible(target)
            ? {
                configurable: true,
                enumerable: true,
                value: source[index],
                writable: false,
              }
            : void 0;
        }
      }
    }
    return getOwnPropertyDescriptor(target, key);
  },
  has(target, key) {
    if (typeof key === 'string') {
      const index = toIndex(key);
      if (index !== null) {
        const source = getSource(target);
        if (source && index < getLengthNonNull(source)) {
          return true;
        }
      }
    }
    return has(target, key);
  },
  ownKeys(target) {
    const length = getLength(getSource(target));
    if (!length) {
      return ownKeys(target);
    }
    let index = 0;
    const keys = new Set<string | symbol>();
    do {
      keys.add(String(index));
    } while (++index < length);
    for (const key of ownKeys(target)) {
      keys.add(key);
    }
    return Array.from(keys);
  },
  preventExtensions() {
    return false;
  },
  set(target, key, value, receiver) {
    return (typeof key !== 'string' || !isIndex(key)) && set(target, key, value, receiver);
  },
});

export class ReadonlyArray<T = any> implements Array<T> {
  constructor(source: ArrayLike<T>) {
    while (source instanceof ReadonlyArray) {
      let innerSource = getSource(source);
      if (innerSource) {
        source = innerSource;
      } else {
        break;
      }
    }
    defineProperty(this, 'length', lengthDescriptor);
    const proxy = new Proxy(this, proxyHandler);
    setSource(proxy, source);
    setSource(this, source);
    return proxy;
  }

  static {
    const { prototype } = this;
    const arrayDescriptors = getOwnPropertyDescriptors(arrayPrototype);
    const descriptors: PropertyDescriptorMap = create(null);
    descriptors.length = lengthDescriptor;
    let descriptor: PropertyDescriptor | undefined;
    for (const key of ownKeys(arrayDescriptors)) {
      if (key === 'length') {
        continue;
      }
      descriptor = arrayDescriptors[key as any];
      if (!descriptor) {
        continue;
      }
      if (hasOwnProperty(descriptor, 'value')) {
        const { value } = descriptor;
        if (typeof value === 'function') {
          descriptors[key] = {
            ...descriptor,
            value: function <T>(this: ReadonlyArray<T>, ...args: any[]): any {
              return apply(value, getSource(this) || [], args);
            },
          };
        } else {
          delete descriptor.value;
          delete descriptor.writable;
          descriptors[key] = {
            ...descriptor,
            get: function <T>(this: ReadonlyArray<T>) {
              return (getSource(this) || arrayPrototype)[key as any];
            },
            set: descriptor.writable
              ? function <T>(this: ReadonlyArray<T>, value: any) {
                  ((getSource(this) || arrayPrototype) as any)[key] = value;
                }
              : void 0,
          };
        }
      } else {
        const { get: getter, set: setter } = descriptor;
        descriptors[key] = {
          ...descriptor,
          get: typeof getter === 'function'
            ? function <T>(this: ReadonlyArray<T>) {
                return call(getter, getSource(this) || arrayPrototype);
              }
            : void 0,
          set: typeof setter === 'function'
            ? function <T>(this: ReadonlyArray<T>, value: any) {
                return call(setter, getSource(this) || arrayPrototype, value);
              }
            : void 0.
        };
      }
    }
    Object.defineProperties(prototype, descriptors);
    Object.freeze(this);
    Object.freeze(prototype);
  }
}
export interface ReadonlyArray<T> extends Array<T> {}

const hasInstanceSymbol: typeof Symbol.hasInstance = Symbol.hasInstance;
defineProperties(Array, {
  [hasInstanceSymbol]: (() => {
    const hasInstanceDescriptor: PropertyDescriptor | undefined =
      getOwnOrInheritedPropertyDescriptor(Array, hasInstanceSymbol) ||
      {
        configurable: true,
        enumerable: false,
        writable: false,
        value: void 0,
      };
    const nativeHasInstance = (() => {
      const fn = hasInstanceDescriptor?.value;
      return typeof fn === 'function' ? fn : bind<(o: unknown) => o is any[]>(isNativeArray, Array);
    })();
    return {
      ...hasInstanceDescriptor,
      value: (x: unknown): boolean => nativeHasInstance(x) || x instanceof ReadonlyArray,
    };
  })(),

  isArray: {
    ...getOwnPropertyDescriptor(Array, 'isArray'),
    value: (value: unknown): boolean => isNativeArray(value) || value instanceof ReadonlyArray,
  },
});
