//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { Value } from "../Value";

/**
 * ValueObject is the base class for defining your Value Object
 * hierarchies.
 *
 * Every Value Object:
 *
 * - has a stored value
 * - that you can get the valueOf()
 *
 * We've deliberately kept this as minimal as possible. We're looking to
 * support idiomatic TypeScript code, rather than functional programming.
 *
 * If you do want fully-functional programming, use one of the many
 * excellent libraries that are out there instead.
 *
 * Use {@link EntityObject} for data that has an identity (a primary key).
 *
 * @category Archetypes
 * @template T the type that's wrapped by this class
 */
export class ValueObject<T> implements Value<T> {
    /**
     * value is the data that we wrap.
     *
     * Child classes are welcome to access it directly (to avoid the cost
     * of a call to `valueOf()`), but must never modify the data at all.
     *
     * @returns the data that is stored in this object.
     */
    protected readonly _value: T;

    /**
     * Constructor builds a new ValueObject.
     *
     * @param input the data to store in this object.
     */
    protected constructor(input: T) {
        this._value = input;
    }

    /**
     * valueOf() returns the wrapped value.
     *
     * For types passed by reference, we do NOT return a clone of any kind.
     * You have to be careful not to accidentally change this value.
     *
     * @returns the data that is stored in this object.
     */
    public valueOf(): T {
        return this._value;
    }

    /**
     * implementsValue() is a helper method for the {@link isValue} type guard
     * function.
     */
    public implementsValue(): this is Value<T> {
        return true;
    }
}
