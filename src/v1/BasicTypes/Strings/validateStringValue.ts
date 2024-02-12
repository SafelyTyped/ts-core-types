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

import type { DataValidatorOptions } from "../../Archetypes/FunctionTypes/DataValidator/DataValidatorOptions";
import type { AppErrorOr } from "../../ErrorHandling/AppErrorOr/AppErrorOr";
import { DEFAULT_DATA_PATH } from "../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { UnsupportedStringValueError } from "../../Errors/UnsupportedStringValue/UnsupportedStringValueError";

/**
 * `validateStringValue()` is a {@link DataValidator}. Use it to prove
 * that `input` is a string that contains any of the `validValues` you
 * provide.
 *
 * @param validValues -
 * A list of case-sensitive values to match against.
 * @param path -
 * Where are we in the nested data structure that you are validating?
 * Use {@link DEFAULT_DATA_PATH} if you are not validating a nested
 * data structure.
 * @param input -
 * The value to validate.
 * @returns
 * - `input` on success, or
 * - an {@link AppError} explaining why validation failed
 *
 * @public
 */
export function validateStringValue(
    validValues: string[],
    input: string,
    {
        path = DEFAULT_DATA_PATH
    }: Partial<DataValidatorOptions> = {}
): AppErrorOr<string> {
    // this will bail on the first match
    const res = validValues.some((value) => {
        return input === value;
    });

    // did we get a match?
    if (res) {
        return input;
    }

    // better luck next time
    return new UnsupportedStringValueError({
        public: {
            dataPath: path,
            permittedValues: validValues,
            actualValue: input,
        }
    });
}