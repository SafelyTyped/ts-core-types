//
// Copyright (c) 2022-present Ganbaro Digital Ltd
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

import { isArray } from "../Arrays";
import { isObjectish } from "./isObjectish";

/**
 * `getPrototypeOf()` returns the object prototype of the unknown `input`
 * if it has one.
 *
 * This is a workaround to avoid disabling typescript-eslint's rules around
 * the `any` type.
 *
 * @param input -
 * The object we want a prototype of.
 * @returns
 * - `null` if the input doesn't satisfy @link{getObjectish}
 * - the object's prototype if it has one
 * - `null` otherwise
 */
export function getPrototypeOf(
    input: unknown,
): object|null|unknown[] {
    // special case - target is a non-object
    if (!isObjectish(input)) {
        return null;
    }

    // go and grab the prototype
    const retval = Object.getPrototypeOf(input) as object;

    // this typeguard helps the compiler and eslint understand
    // what is going on, to avoid littering the calling code
    // with additional type checks / eslint directives
    if (isArray(retval)) {
        return retval;
    }

    return retval;
}