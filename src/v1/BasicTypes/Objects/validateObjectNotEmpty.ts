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

import type { AppErrorOr } from "../../ErrorHandling/AppErrorOr/AppErrorOr";
import type { DataPath } from "../../ErrorHandling/DataPath/DataPath";
import { ObjectCannotBeEmptyError } from "../../Errors/ObjectCannotBeEmpty/ObjectCannotBeEmptyError";

/**
 * `validateObjectNotEmpty()` is an object validator. Use it to determine
 * if the given object is completely empty (no attributes) or not.
 *
 * @param path -
 * where are we in the data structure you are validating?
 * @param input -
 * the value to inspect
 * @returns
 * - `input`, type-cast to <T>, if validation succeeds, or
 * - an {@link AppError} explaining why validation failed
 *
 * @public
 */
export function validateObjectNotEmpty<T extends object = object>(
    path: DataPath,
    input: object,
): AppErrorOr<T> {
    // there's probably a more efficient way to do this?
    // for now, let's just do the basics that we know will work
    const keyCount = Object.keys(input).length;
    if (keyCount > 0) {
        return input as T;
    }

    return new ObjectCannotBeEmptyError({
        public: {
            dataPath: path,
        }
    });
}