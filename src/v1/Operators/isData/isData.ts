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
import { DataValidator } from "../../Archetypes";
import { IsDataOptions } from "./IsDataOptions";

/**
 * `isData()` is a helper function. Use it to quickly build {@link TypeGuard}
 * functions out of your {@link TypeValidator} functions.
 *
 * @typeParam IN -
 * This is the type that your validator expects
 * @typeParam T -
 * This is the type that your validator returns
 * @param validator -
 * This is the {@link TypeValidator} function to use
 * @param input -
 * This is value to inspect
 * @param path -
 * Where are we in the data structure that you are validating?
 * @returns
 * - `true` if input is successfully validated
 * - `false` otherwise
 *
 * @public
 */
export function isData<IN, T, OPT extends object = object>(
    validator: DataValidator<IN, T>,
    input: IN,
    options: IsDataOptions & OPT,
): boolean {
    return !((validator(options.path, input, options)) instanceof Error);
}