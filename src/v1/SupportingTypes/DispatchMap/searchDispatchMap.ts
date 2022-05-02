// tslint:disable: ban-types
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

import { AnyFunction } from "../../Archetypes";
import { DispatchMap } from "./DispatchMap";
import { AnyDispatchMapKey } from "./AnyDispatchMapKey";
import { getProperty } from "../../BasicTypes";

/**
 * `searchDispatchMap()` will iterate through `keysToTry`
 * in order. When we find a matching key in `table`, we'll return the
 * corresponding function from `table`.
 *
 * If no match is found, we'll return `fallback()` instead.
 *
 * See {@link resolveNumerical} and {@link validateBooleanishData} for two
 * examples of how this function can be used.
 *
 * @param table -
 * The map of functions that we can search
 * @param keysToTry -
 * The list of keys to check. Whichever one exists first on `table`, wins.
 * @param fallback -
 * The function to return if none of the `keysToTry` exist on `table`.
 * If you want to throw an {@link AppError}, `fallback()` is the place to
 * do so.
 *
 * @typeParam F -
 * The function signature of the functions in `table`, and also the function
 * signature of `fallback`.
 *
 * @public
 */
 export function searchDispatchMap<F extends AnyFunction, K extends AnyDispatchMapKey>(
    table: DispatchMap<K, F>,
    keysToTry: AnyDispatchMapKey[],
    fallback: F,
): F {
    // do we have any of the requested keys?
    //
    // Typescript does not support using symbols as object property
    // names here. We use a workaround to avoid littering our code
    // with casts to `any`.
    for (const keyToTry of keysToTry) {
        const retval = getProperty<F>(table, keyToTry);
        if (retval) {
            return retval;
        }
    }

    // no, we do not :(
    return fallback;
}