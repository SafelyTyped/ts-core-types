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

import type { TypeValidatorOptions } from "../../Archetypes/FunctionTypes/TypeValidator/TypeValidatorOptions";
import type { AppErrorOr } from "../../ErrorHandling/AppErrorOr/AppErrorOr";
import { DEFAULT_DATA_PATH } from "../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { UnsupportedTypeError } from "../../Errors/UnsupportedType/UnsupportedTypeError";

/**
 * `validateObjectish()` is a {@link TypeGuard}. Use it to prove that the
 * unknown `input` really is an object of some kind.
 *
 * `Array` is treated AS an object.
 * `null` is treated as NOT an object.
 *
 * @param path -
 * where are we in the data structure you are validating?
 * @param input -
 * the value to inspect
 * @returns
 * - `input`, type-cast to an object, if validation succeeds, or
 * - an {@link AppError} explaining why validation failed
 *
 * @public
 */
export function validateObjectish(
    input: unknown,
    {
        path = DEFAULT_DATA_PATH
    }: TypeValidatorOptions = {}
): AppErrorOr<object> {
    // shorthand
    const expectedMsg = "non-null object";

    // easy one first
    if (typeof input !== "object") {
        return new UnsupportedTypeError({
            public: {
                dataPath: path,
                expected: expectedMsg,
                actual: typeof input
            }
        });
    }

    // it's a weird world where null is an object ...
    if (input === null) {
        return new UnsupportedTypeError({
            public: {
                dataPath: path,
                expected: expectedMsg,
                actual: "null"
            }
        });
    }

    // all done!
    return input;
}