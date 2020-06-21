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
import { implementsToPrimitive, implementsToString } from "../../Protocols";
import { numerical } from "./numerical";

/**
 * `resolveNumerical()` is an option type resolver. It attempts to convert
 * the input value to be a `number`:
 *
 * - numbers remain as numbers
 * - booleans become 0|1
 * - strings get converted to a number
 * - objects, we try methods in this order:
 *   - `[Symbol.toPrimitive]("number")`
 *   - `toString()`
 *
 * @param input
 * the value to be converted
 * @returns
 * - a `number` on success, or
 * - `NaN` on failure
 *
 * @category OptionTypes
 */
export function resolveNumerical(
    input: numerical
): number {
    const inputType = typeof input;
    if (NumericalResolversTable[inputType]) {
        return NumericalResolversTable[inputType](input);
    }

    // if we get here, we don't know how to process what we've got
    return NaN;
}

type NumericalResolversList = {
    [key: string]: (x: any) => number;
}

const NumericalResolversTable: NumericalResolversList = {
    boolean: (x: boolean) => x ? 1 : 0,
    number: (x: number) => x,
    object: (x: object) => {
        if (implementsToPrimitive(x)) {
            return Number(+x);
        }

        if (implementsToString(x)) {
            return Number(x.toString());
        }

        return NaN;
    },
    string: (x: string) => Number(x),
}