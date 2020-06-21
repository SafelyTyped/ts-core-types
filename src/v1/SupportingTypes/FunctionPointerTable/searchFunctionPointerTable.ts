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
import { FunctionPointerTable } from "./FunctionPointerTable";

/**
 * `searchFunctionPointerTable()` will iterate through `keysToTry`
 * in order. When we find a matching key in `table`, we'll return the
 * corresponding function from `table`.
 *
 * If no match is found, we'll return `fallback()` instead.
 *
 * See {@link resolveNumeric} and {@link validateBooleanData} for two
 * examples of how this function can be used.
 *
 * @param table
 * the map of functions that we can search
 * @param keysToTry
 * the list of keys to check. Whichever one exists first on `table`, wins.
 * @param fallback
 * The function to return if none of the `keysToTry` exist on `table`.
 * If you want to throw an {@link AppError}, `fallback()` is the place to
 * do so.
 *
 * @template F
 * The function signature of the functions in `table`, and also the function
 * signature of `fallback`.
 *
 * @category FunctionPointerTable
 */
 export function searchFunctionPointerTable<F extends AnyFunction>(
    table: FunctionPointerTable<any, F>,
    keysToTry: string[],
    fallback: F,
): F {
    // do we have any of the requested keys?
    for (const keyToTry of keysToTry) {
        if (table[keyToTry]) {
            // we have a winner!
            return table[keyToTry];
        }
    }

    // no, we do not :(
    return fallback;
}