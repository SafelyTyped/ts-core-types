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
import { findPropertyNames } from "../Objects";
import { STOP_AT_NEXT_PROTOTYPE } from "../Prototypes";

/**
 * `HashMap` describes an object that doesn't have a set list of keys.
 *
 * It's very handy for convincing the Typescript compiler to let us
 * iterate over the contents of a data bag.
 *
 * @public
 */
export interface HashMap<T> {
    [key: string]: T
}

/**
 * @public
 */
export class HashMap<T> {
    /**
     * `forEach()` is the equivalent of `Array.forEach()`, only
     * it works on HashMaps instead.
     *
     * @param target -
     * the HashMap to iterate over
     * @param callbackfn -
     * the function to call when we iterate
     *
     * @public
     */
    public static forEach<T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => void
    ): void {
        HashMap.keys(target)
            .forEach((name: string) => {
                callbackfn(target[name], name, target);
            }
        );
    }

    /**
     * `filter()` is the equivalent of `Array.filter()`, only it works
     * on HashMaps instead.
     *
     * @param target -
     * the HashMap to iterate over
     * @param callbackfn -
     * the function to call when we iterate
     * @returns
     * a (possibly empty) HashMap of objects, taken from `target`
     *
     * @typeParam T -
     * the type of object held in target
     * @typeParam R -
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
     * `some()` is the equivalent of `Array.some()`, only
     * it works on HashMaps instead.
     *
     * @param target -
     * the HashMap to iterate over
     * @param callbackfn -
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
        return HashMap.keys(target)
            .some((name: string) => {
                return callbackfn(target[name], name, target);
            }
        );
    }

    /**
     * `every()` is the equivalent of `Array.every()`, only
     * it works on HashMaps instead.
     *
     * @param target -
     * the HashMap to iterate over
     * @param callbackfn -
     * the function to call when we iterate
     * @returns
     * - `true` if your `callbackfn()` returns `true` for ALL of the
     *   attributes in your HashMap
     * - `false` if your `callbackfn()` returns `false` for ANY of the
     *   attributes in your HashMap
     */
    public static every<T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => boolean
    ): boolean {
        return HashMap.keys(target)
            .every((name: string) => {
                return callbackfn(target[name], name, target);
            }
        );
    }

    /**
     * `first()` searches the given HashMap for a property that satisfies
     * the test in the given callback function.
     *
     * On success, it returns a HashMap containing only the first property
     * that satisfies the given callback function.
     *
     * On failure, it returns an empty HashMap.
     *
     * The order that we search the HashMap cannot be guaranteed.
     *
     * @param target -
     * the HashMap to search
     * @param callbackfn -
     * the function to call when we iterate over `target`
     * @returns
     * - a HashMap containing the first matching property on success,
     * - an empty HashMap on failure
     */
    public static first<T, R=T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => boolean
    ): HashMap<R> {
        // our return value
        const retval: HashMap<R> = {};

        // do we have a property to return?
        const maybePropName = HashMap.firstKey(target, callbackfn);
        if (maybePropName) {
            // yes we do
            retval[maybePropName] = (target[maybePropName] as unknown) as R;
        }

        // all done
        return retval;
    }

    /**
     * `firstKey()` searches the given HashMap for a property that
     * satisfies the test in the given callback function.
     *
     * On success, it returns the name of the first property that satisfies
     * the given callback function.
     *
     * On failure, it returns null.
     *
     * The order that we search the HashMap cannot be guaranteed.
     *
     * @param target -
     * the HashMap to search
     * @param callbackfn -
     * the function to call when we iterate over `target`
     * @returns
     * - a HashMap containing the first matching property on success,
     * - an empty HashMap on failure
     */
    public static firstKey<T>(
        target: HashMap<T>,
        callbackfn: (value: T, name: string, obj: HashMap<T>) => boolean
    ): string|null {
        const propNames = HashMap.keys(target);

        for(const name of propNames) {
            if (callbackfn(target[name], name, target)) {
                return name;
            }
        }

        // if we get here, we did not find a match
        return null;
    }

    /**
     * `keys()` returns a list of all the property names from the given
     * HashMap.
     *
     * Unlike `Object.keys()`, `HashMap.keys()` only returns properties
     * that belong to `target` (ie nothing that belongs to its prototypes).
     *
     * @param target -
     * the HashMap to example
     * @returns
     * the (possibly empty) list of attribute names from `target`
     */
    public static keys<T>(target: HashMap<T>): string[]
    {
        return findPropertyNames(
            target,
            { nextPrototype: STOP_AT_NEXT_PROTOTYPE }
        );
    }
}