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
 * `Immutable` is a version of `Readonly` that works on all known types.
 *
 * THIS IS EXPERIMENTAL.
 *
 * @category UtilityTypes
 */
export type Immutable<T> =
    T extends Primitivish ? T
        : T extends Array<infer U> ? ReadonlyArray<U>
        : T extends Map<infer K, infer V> ? ReadonlyMap<K,V>
        : T extends WeakMap<infer K, infer V> ? Readonly<WeakMap<Immutable<K>, Immutable<V>>>
        : T extends Set<infer U> ? ReadonlySet<U>
        : T extends WeakSet<infer U> ? Readonly<WeakSet<Immutable<U>>>
        : T extends Promise<infer U> ? Promise<Immutable<U>>
        : Readonly<T>;