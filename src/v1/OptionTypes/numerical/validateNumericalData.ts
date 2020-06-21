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
import { AppErrorOr } from "..";
import { UnsupportedNumericalValueError } from "../../Errors";
import { DataPath } from "../../SupportingTypes";
import { numerical } from "./numerical";
import { resolveNumerical } from "./resolveNumerical";

/**
 * `validateNumericalData()` is a data validator. Use it to prove that
 * the input data can be converted to a valid number.
 *
 * @param path
 * where are you in the data structure that you're validating?
 * Use {@link DEFAULT_DATA_PATH} if you're not looking at a nested structure.
 * @param input
 * the value to validate
 * @returns
 * - `input` converted to its number value on success, or
 * - an AppError explaining why validation failed
 *
 * @category OptionTypes
 */
export function validateNumericalData(
    path: DataPath,
    input: numerical
): AppErrorOr<numerical> {
    // convert it!
    const n = resolveNumerical(input);

    // do we like the results?
    if (isNaN(n) || !isFinite(n)) {
        return new UnsupportedNumericalValueError({
            public: {
                dataPath: path,
                value: input,
            }
        });
    }

    // all good
    return n;
}