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

import type { TypeValidatorOptions } from "../../Archetypes/FunctionTypes/TypeValidator/TypeValidatorOptions";
import { validateObject } from "../../BasicTypes/Objects/validateObject";
import { validateObjectHasAllMethodsCalled } from "../../BasicTypes/Objects/validateObjectHasAllMethodsCalled";
import type { AppErrorOr } from "../../ErrorHandling/AppErrorOr/AppErrorOr";
import { DEFAULT_DATA_PATH } from "../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { validate } from "../../Operators/validate/validate";
import type { ProtocolDefinition } from "../ProtocolDefinition/ProtocolDefinition";

/**
 * `validateImplementsProtocol()` is a type validator. Use it to prove
 * that `input` (probably!) has the public API described by `protocol`.
 *
 * We say "probably" because JavaScript currently has very limited
 * reflection support at runtime.
 *
 * We check:
 * - that the methods all exist on input
 *
 * We do not check:
 * - that the methods have the right type signatures
 * - for Symbols
 *
 * @param path -
 * Where are we in the data structure that you are validating?
 * @param input -
 * The object to validate
 * @param protocol -
 * The public API to check for
 * @returns
 * - `input` type-cast to be `T` on success, or
 * - an `AppError` describing why `input` failed validation
 *
 * @public
 */
export function validateImplementsProtocol<T extends object>(
    protocol: ProtocolDefinition,
    input: unknown,
    {
        path = DEFAULT_DATA_PATH
    }: Partial<TypeValidatorOptions> = {}
): AppErrorOr<T> {
    return validate(input)
        .next((x) => validateObject(x, { path }))
        .next((x) => validateObjectHasAllMethodsCalled<T>(protocol, x, { path }))
        .value();
}