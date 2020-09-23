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
import { findAttributeNames } from "../Objects";
import { STOP_AT_NEXT_PROTOTYPE } from "../Prototypes";

/**
 * `HashMap` describes an object that doesn't have a set list of keys.
 *
 * It's very handy for convincing the Typescript compiler to let us
 * iterate over the contents of a data bag.
 *
 * @category BasicTypes
 */
export interface HashMap<T> {
    [key: string]: T
}

export class HashMap<T> {
    /**
     * `forEach()` is the equivalent of {@link Array.forEach}, only
     * it works on {@link HashMap}s instead.
     *
     * @param target
     * the HashMap to iterate over
     * @param callbackfn
     * the function to call when we iterate
     *
     * @category BasicTypes
     */
    public static forEach<T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => void
    ): void {
        findAttributeNames(
            target,
            { nextPrototype: STOP_AT_NEXT_PROTOTYPE }
        ).forEach((name: string) => {
            callbackfn(target[name], name, target);
        });
    }

    /**
     * `filter()` is the equivalent of {@link Array.filter}, only it works
     * on {@link HashMap}s instead.
     *
     * @param target
     * the HashMap to iterate over
     * @param callbackfn
     * the function to call when we iterate
     * @returns
     * a (possibly empty) HashMap of objects, taken from `target`
     *
     * @template T
     * the type of object held in target
     * @template R
     * the type of object held in the returned HashMap
     * set this if you're filtering for objects that all implement a
     * specific interface.
     */
    public static filter<T, R=T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => boolean
    ): HashMap<R> {
        const retval: HashMap<R> = {};

        HashMap.forEach(target, (value, name, obj) => {
            if (callbackfn(value, name, obj)) {
                retval[name] = (value as unknown) as R;
            }
        });

        return retval;
    }

    /**
     * `some()` is the equivalent of {@link Array.some}, only
     * it works on {@link HashMap}s instead.
     *
     * @param target
     * the HashMap to iterate over
     * @param callbackfn
     * the function to call when we iterate
     * @returns
     * - `true` if your `callbackfn()` returns `true` for any of the
     *   attributes in your HashMap
     * - `false` if your `callbackfn()` returns `false` for ALL of the
     *   attributes in your HashMap
     */
    public static some<T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => boolean
    ): boolean {
        return findAttributeNames(
            target,
            { nextPrototype: STOP_AT_NEXT_PROTOTYPE }
        ).some((name: string) => {
            return callbackfn(target[name], name, target);
        });
    }
}