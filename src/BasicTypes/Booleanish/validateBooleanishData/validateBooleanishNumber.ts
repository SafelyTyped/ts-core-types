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

import type { DataValidatorOptions } from "../../../Archetypes/FunctionTypes/DataValidator/DataValidatorOptions";
import type { AppErrorOr } from "../../../ErrorHandling/AppErrorOr/AppErrorOr";
import { DEFAULT_DATA_PATH } from "../../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { UnsupportedBooleanishValueError } from "../../../Errors/UnsupportedBooleanishValue/UnsupportedBooleanishValueError";

/**
 * `BooleanishNumbers` describes the required information when booleanish
 * processing for the `number` type is supported.
 *
 * @public
 */
export type BooleanishNumbers = {
    true: number;
    false: number;
}

/**
 * `validateBooleanishNumber()` converts the `input` into a boolean
 * (if possible).
 *
 * @param path -
 * where we are in the data structure you are validating
 * @param input -
 * the number to try to convert into a boolean
 * @returns
 * - `true` or `false` on success
 * - an {@link AppError} explaining why conversion failed otherwise
 *
 * @public
 */
export function validateBooleanishNumber(
    booleanish: BooleanishNumbers,
    input: number,
    {
        path = DEFAULT_DATA_PATH
    }: DataValidatorOptions = {}
): AppErrorOr<boolean> {
    if (input === booleanish.false) {
        return false;
    }
    if (input === booleanish.true) {
        return true;
    }

    return new UnsupportedBooleanishValueError({
        public: {
            dataPath: path,
            type: "number",
            expected: booleanish.false + " | " + booleanish.true,
            actual: input
        }
    });
}

