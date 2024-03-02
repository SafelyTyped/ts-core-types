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

import type { TypeGuard } from "../../../Archetypes/FunctionTypes/TypeGuard/TypeGuard";
import { DEFAULT_DATA_PATH } from "../../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { isType } from "../../../Operators/isType/isType";
import type { TypeGuardOptions } from "../../FunctionTypes/TypeGuard/TypeGuardOptions";
import type { TypeValidator } from "../../FunctionTypes/TypeValidator/TypeValidator";
import type { Value } from "./Value";
import { validateValueOf } from "./validateValueOf";

/**
 * `isValueOf()` is a {@link TypeGuard}. It proves whether or not the given
 * `input` implements the {@link Value} protocol AND that it contains the
 * expected type inside.
 *
 * @public
 *
 * @param typeValidator -
 * the {@link TypeValidator} to apply to Value.valueOf()
 * @param input -
 * the data to inspect
 * @returns
 * - `true` if:
 *   - `input` is a {@link Value} of some kind, and
 *   - `input.valueOf()` passes the `typeValidator`
 * - `false` otherwise
 */
export function isValueOf<T> (
    typeValidator: TypeValidator<T>,
    input: unknown,
    {
        path = DEFAULT_DATA_PATH
    }: Partial<TypeGuardOptions> = {}
): input is Value<T>
{
    // we've got an extra parameter, so we need to give isType() a bit of
    // help
    const partial: TypeValidator<Value<T>> = (input: unknown, { path }) => validateValueOf(typeValidator, input, { path });

    // normal service can now resume :)
    return isType(partial, input, { path });
}

