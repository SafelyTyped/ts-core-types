//
// Copyright (c) 2022-present Ganbaro Digital Ltd
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

import { DEFAULT_DATA_PATH } from "../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { THROW_THE_ERROR } from "../../ErrorHandling/OnError/defaults/THROW_THE_ERROR";
import { mustBe } from "../../Operators/mustBe/mustBe";
import type { TypeGuaranteeOptions } from "../../Archetypes/FunctionTypes/TypeGuarantee/TypeGuaranteeOptions";
import type { Has } from "./Has";
import { validateImplementsHas } from "./validateImplementsHas";

/**
 * `mustImplementHas()` is a {@link TypeGuarantee}.
 *
 * Use it to prove to both Typescript and your code at runtime that the
 * given `input` value is a {@link Has}<T>.
 *
 * If validation fails, the supplied `onError()` handler is called.
 *
 * @typeParam T
 * - The type of the data that the `has()` method supports checking for.
 * @param input -
 * - the data to guarantee
 * @param onError -
 * we will call this if validation fails
 * @param path -
 * where you are in your data structures
 * @returns
 * `input` (typecast to Has<T>) on success
 */
export function mustImplementHas<T = unknown>(
    input: unknown,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
    }: TypeGuaranteeOptions = {}
): Has<T> {
    return mustBe(input, { onError })
        .next((x) => validateImplementsHas<T>(x, { path }))
        .value();
}