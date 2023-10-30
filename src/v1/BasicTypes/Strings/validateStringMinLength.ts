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

import type { AppErrorOr } from "../../ErrorHandling";
import type { DataPath } from "../../SupportingTypes";
import { StringIsTooShortError } from "../../Errors";

/**
 * `validateStringMinLength()` is a {@link DataValidator}. It proves that
 * the `input` string is at least `minLength` characters long.
 *
 * @param minLength -
 * how short can the string be?
 * @param path -
 * where you are in your data structure. Use {@link DEFAULT_DATA_PATH}
 * if you're not sure what value to provide.
 * @param input -
 * the string to validate
 * @returns
 * - `input` if the input successfully validates
 * - an AppError if the input did not validate
 *
 * @public
 */
export function validateStringMinLength(
    minLength: number,
    path: DataPath,
    input: string
): AppErrorOr<string> {
    // does our input string validate?
    if (input.length >= minLength) {
        // all good
        return input;
    }

    // let's give them the bad news
    return new StringIsTooShortError({
        public: {
            dataPath: path,
            minLength,
            actualLength: input.length,
        }
    });
}
