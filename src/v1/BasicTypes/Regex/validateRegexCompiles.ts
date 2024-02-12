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
import { extractReasonFromCaught } from "../../ErrorHandling/Helpers/extractReasonFromCaught";
import { RegexDoesNotCompileError } from "../../Errors/RegexDoesNotCompile/RegexDoesNotCompileError";

/**
 * `validateRegexCompiles()` is a {@link DataValidator}. Use it to prove
 * that `input` is a valid regex. We do this by attempting to compile
 * `input`.
 *
 * @param path -
 * Where are we in the nested data structure that you are validating?
 * Use {@link DEFAULT_DATA_PATH} if you are not validating a nested
 * data structure.
 * @param input -
 * The value to validate.
 * @returns
 * - the compiled RegExp on success, or
 * - an {@link AppError} explaining why validation failed
 *
 * @public
 */
export function validateRegexCompiles(
    input: string,
    flags?: string,
    {
        path = DEFAULT_DATA_PATH
    }: Partial<DataValidatorOptions> = {}
): AppErrorOr<RegExp> {
    try {
        // tslint:disable-next-line: no-unused-expression
        return new RegExp(input, flags);
    } catch (e) {
        return new RegexDoesNotCompileError({
            public: {
                dataPath: path,
                input,
                error: extractReasonFromCaught(e)
            }
        });
    }
}