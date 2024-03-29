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

import type { AppErrorOr } from "../../../ErrorHandling/AppErrorOr/AppErrorOr";
import type { TypeValidatorOptions } from "./TypeValidatorOptions";

/**
 * `TypeValidator` is a function type. It describes the type signature of
 * any function that inspects a data value.
 *
 * These functions return:
 *
 * - the input value on success, or
 * - an Error explaining why the validation failed
 *
 * `TypeValidator`s are used to validate data received from untrusted sources,
 * such as:
 *
 * - HTTP request objects
 * - datastores
 *
 * @public
 * @typeParam T -
 * This is the type of data that will be returned on success.
 * @typeParam OPT -
 * This is the type of options that the validator accepts.
 * @param input -
 * This is the data to be validated.
 * @param options -
 * This is the set of optional parameters that the validator accepts.
 */
export type TypeValidator<T, OPT extends TypeValidatorOptions = TypeValidatorOptions> = (
    input: unknown,
    options?: OPT
) => AppErrorOr<T>;
