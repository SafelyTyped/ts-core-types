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
import { OnErrorOptions } from "../../ErrorHandling";

/**
 * A `TypeGuarantee` inspects a piece of data to see if the data is the given
 * type.
 *
 * If the given data is the given type, the function returns `true`.
 * It passes an error to the user-supplied `onError()` handler otherwise.
 * The `onError()` handler will throw an exception.
 *
 * TypeGuarantees are a form of runtime robustness check. They're used to
 * make sure that the given input is the type you think it is, before you
 * try and use that input. They help prevent runtime errors.
 *
 * Internally, TypeGuarantees re-use existing {@link TypeGuard} functions.
 *
 * @template T
 * `T` is the type of data we are guaranteeing.
 * @param input
 * The data to guarantee.
 * @param options.onError
 * We call this if `input` fails the inspection.
 */
export type TypeGuarantee<T>
    = (input: unknown, options?: OnErrorOptions) => input is T;