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

import { AppError } from "../../../ErrorHandling/AppError/AppError";
import type { AppErrorOr } from "../../../ErrorHandling/AppErrorOr/AppErrorOr";
import { DEFAULT_DATA_PATH } from "../../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { validate } from "../../../Operators/validate/validate";
import type { TypeValidator } from "../../FunctionTypes/TypeValidator/TypeValidator";
import type { TypeValidatorOptions } from "../../FunctionTypes/TypeValidator/TypeValidatorOptions";
import type { Value } from "./Value";
import { validateValue } from "./validateValue";

/**
 * `validateValueOf()` is a {@link TypeValidator}. Use it to prove than an
 * unknown `input` really is some kind of {@link Value} object, and that it
 * contains the expected wrapped type.
 *
 * @typeParam T -
 * what kind of value are we expecting?
 * @param typeValidator -
 * an additional validator, that we'll use to make sure the `Value` object
 * contains the type of {@link Value} we expect.
 * @param input -
 * the value to inspect
 * @param path -
 * Where we are in the data structure you are validating
 * @returns
 * - `input` if it is a {@link Value} object, or
 * - an {@link AppError} explaining why validation failed
 */
export function validateValueOf<T>(
    typeValidator: TypeValidator<T>,
    input: unknown,
    {
        path = DEFAULT_DATA_PATH
    }: TypeValidatorOptions = {}
): AppErrorOr<Value<T>> {
    return validate(input)
        .next((x) => validateValue(x, { path }))
        .next((x) => validateValueWraps(typeValidator, x, { path }))
        .value();
}

function validateValueWraps<T>(
    typeValidator: TypeValidator<T>,
    input: Value<unknown>,
    {
        path = DEFAULT_DATA_PATH
    }: TypeValidatorOptions = {}
): AppErrorOr<Value<T>> {
    const retval = typeValidator(input.valueOf(), { path });
    if (retval instanceof AppError) {
        return retval;
    }

    return input as Value<T>;
}