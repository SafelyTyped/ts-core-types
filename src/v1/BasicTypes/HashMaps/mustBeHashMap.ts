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

import type { DataGuaranteeOptions, TypeValidator } from "../../Archetypes";
import { DEFAULT_DATA_PATH, THROW_THE_ERROR } from "../../ErrorHandling";
import { mustBe } from "../../Operators";
import { HashMap } from "./HashMap";
import { validateHashMap } from "./validateHashMap";

/**
 * `mustBeHashMap()` is a {@link TypeGuarantee}.
 *
 * Use it to prove to both Typescript and your code at runtime that
 * the given `input` value is a `HashMap<T>`.
 *
 * If validation fails, the supplied `onError()` handler is called.
 *
 * @param valueValidator -
 * a {@link TypeValidator} to make sure the HashMap contains the kind of
 * data that you are expecting
 * @param input -
 * the data to guarantee
 * @param onError -
 * we will call this is data validation fails
 * @param path -
 * where you are in your data structures. If unsure, pass in
 * {@link DEFAULT_DATA_PATH}
 * @returns
 * `input` (typecast to HashMap<T>) on success
 */
export function mustBeHashMap<T>(
    valueValidator: TypeValidator<T>,
    input: unknown,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
    }: Partial<DataGuaranteeOptions> = {}
): HashMap<T> {
    return mustBe(input, { onError })
        .next((x) => validateHashMap(valueValidator, path, x))
        .value();
}