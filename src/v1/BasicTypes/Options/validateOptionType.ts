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

import type { TypeValidator } from "../../Archetypes/FunctionTypes/TypeValidator/TypeValidator";
import { AppError } from "../../ErrorHandling/AppError/AppError";
import type { AppErrorOr } from "../../ErrorHandling/AppErrorOr/AppErrorOr";
import type { DataPath } from "../../ErrorHandling/DataPath/DataPath";
import { extractReasonFromCaught } from "../../ErrorHandling/Helpers/extractReasonFromCaught";
import { UnsupportedTypeError } from "../../Errors/UnsupportedType/UnsupportedTypeError";

/**
 * `validateOptionalType()` is a {@link TypeValidator}. Use it to prove
 * that `input` is either type `A` or type `B`.
 *
 * @typeParam A -
 * The type to check for first.
 * @typeParam B -
 * The type to check for second.
 * @param aValidator -
 * The validator to use to check for type `A`.
 * @param bValidator -
 * The validator to use to check for type `B`.
 * @param path -
 * Where are we in the nested data structure you are validating? Use
 * {@link DEFAULT_DATA_PATH} if you are not in a nested data struture.
 * @param input -
 * The value to validate.
 * @returns
 * - `input` if it passes either of `aValidator` or `bValidator`
 * - an `AppError` to explain why validation failed
 *
 * @public
 */
export function validateOptionType<A, B>(
    aValidator: TypeValidator<A>,
    bValidator: TypeValidator<B>,
    path: DataPath,
    input: unknown
): AppErrorOr<A|B> {
    // first time's a charm
    const resA = aValidator(path, input, {});
    if (!(resA instanceof AppError)) {
        return resA;
    }

    // that didn't work. second time's a charm?
    const resB = bValidator(path, input, {});
    if (!(resB instanceof AppError)) {
        return resB;
    }

    // let's try and make sense of this for the caller
    return new UnsupportedTypeError({
        public: {
            dataPath: path,
            expected: "option type",
            actual: extractReasonFromCaught(resA) + "; " + extractReasonFromCaught(resB),
        }
    });
}