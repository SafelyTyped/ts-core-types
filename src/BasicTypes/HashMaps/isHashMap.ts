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

import type { AnyTypeValidator } from "../../Archetypes/FunctionTypes/TypeValidator/AnyTypeValidator";
import { isType } from "../../Operators/isType/isType";
import { HashMap } from "./HashMap";
import { validateHashMap } from "./validateHashMap";

/**
 * `isHashMap()` is a {@link TypeGuard}.
 *
 * Use it to convince the Typescript compiler that `input` really is
 * a HashMap<T>
 *
 * @param valueValidator -
 * the validator to use to make sure your HashMap contains the kind of
 * data that you expect
 * @param input -
 * the value to check
 * @returns
 * - `true` if `input` is a `HashMap<T>`
 * - `false` otherwise
 */
export function isHashMap<T>(
    valueValidator: AnyTypeValidator,
    input: unknown,
): input is HashMap<T> {
    return isType(
        () => validateHashMap(valueValidator, input),
        input,
        {}
    );
}