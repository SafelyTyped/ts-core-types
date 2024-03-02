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

import { DEFAULT_DATA_PATH } from "../../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { isType } from "../../../Operators/isType/isType";
import type { TypeValidatorOptions } from "../../FunctionTypes/TypeValidator/TypeValidatorOptions";
import type { Entity } from "./Entity";
import { validateEntity } from "./validateEntity";

/**
 * `isEntity()` is a type guard. It proves whether or not the given `input`
 * implements the {@link Entity} protocol.
 *
 * @public
 * @typeParam ID
 * - The type of the entity's ID property.
 * @typeParam T
 * - The type of the wrapped data.
 * @param input -
 * the data to inspect
 * @returns
 * - `true` if:
 *   - `input` implements {@link Entity},
 *   - and if the `implementsEntity()` method returns `true`
 * - `false` otherwise
 */
export function isEntity<ID = unknown, T = unknown>(
    input: unknown,
    {
        path = DEFAULT_DATA_PATH
    }: Partial<TypeValidatorOptions> = {}
): input is Entity<ID,T> {
    return isType(validateEntity, input, { path });
}