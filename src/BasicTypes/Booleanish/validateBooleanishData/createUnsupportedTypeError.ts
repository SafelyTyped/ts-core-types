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

import type { AnyAppError } from "../../../ErrorHandling/AppError/AnyAppError";
import type { AppError } from "../../../ErrorHandling/AppError/AppError";
import type { DataPath } from "../../../ErrorHandling/DataPath/DataPath";
import { UnsupportedTypeError } from "../../../Errors/UnsupportedType/UnsupportedTypeError";

/**
 * `createUnsupportedTypeError()` creates the {@link UnsupportedTypeError}
 * that {@link validateBooleanishData} ultimately throws.
 *
 * See {@link DEFAULT_BOOLEANISH} for the default conversion rules.
 *
 * @param path -
 * where we are in the data structure that you are validating
 * @param input -
 * the value that failed inspection
 * @param supportedTypes -
 * the list of data types that are supported
 * @returns
 * - an {@link AppError} explaining why the input failed validation
 *
 * @public
 * @ignore
 */
export function createUnsupportedTypeError(
    input: unknown,
    path: DataPath,
    supportedTypes: string[],
): AnyAppError {
    return new UnsupportedTypeError({
        public: {
            dataPath: path,
            expected: supportedTypes.join(" | "),
            actual: typeof input
        }
    });
}
