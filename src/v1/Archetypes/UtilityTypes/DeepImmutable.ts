// tslint:disable: array-type no-shadowed-variable
//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Based on code from https://github.com/microsoft/TypeScript/issues/13923
// This file is in the public domain.
//

import { Primitivish } from "../../BasicTypes";

/**
 * `DeepImmutable` is a version of `Readonly` that works on all known types
 * AND their child members / properties.
 *
 * THIS IS EXPERIMENTAL.
 *
 * @public
 */
export type DeepImmutable<T> =
    T extends Primitivish ? T
    : T extends Array<infer U> ? DeepImmutableArray<U>
    : T extends Map<infer K, infer V> ? DeepImmutableMap<K,V>
    : T extends WeakMap<infer K, infer V> ? Readonly<WeakMap<DeepImmutable<K>, DeepImmutable<V>>>
    : T extends Set<infer V> ? DeepImmutableSet<V>
    : T extends WeakSet<infer U> ? Readonly<WeakSet<DeepImmutable<U>>>
    : T extends Promise<infer U> ? Promise<DeepImmutable<U>>
    : DeepImmutableObject<T>;

/**
 * `DeepImmutableArray` is a version of `Readonly` that converts every
 * element in the array (and their children too) into `Readonly` types.
 */
interface DeepImmutableArray<T> extends ReadonlyArray<DeepImmutable<T>> {}

/**
 * `DeepImmutableMap` is a version of `ReadonlyMap` that converts every
 * element of the map (and their children too) into `Readonly` types.
 */
interface DeepImmutableMap<K,V> extends ReadonlyMap<DeepImmutable<K>, DeepImmutable<V>> {}

/**
 * `DeepImmutableSet` is a version of `ReadonlySet` that converts every
 * entry in the set (and their children too) into `Readonly` types.
 */
interface DeepImmutableSet<U> extends ReadonlySet<DeepImmutable<U>> {}

/**
 * `DeepImmutableObject` is a version of `Readonly` that converts every
 * entry in the object (and their children too) into `Readonly` types.
 */
type DeepImmutableObject<T> = {
    readonly [K in keyof T]: DeepImmutable<T[K]>
}