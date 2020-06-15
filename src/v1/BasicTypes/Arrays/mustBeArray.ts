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
import { DataGuaranteeOptions, TypeGuarantee } from "../../Archetypes";
import { THROW_THE_ERROR } from "../../ErrorHandling";
import { mustBe } from "../../Operators";
import { DEFAULT_DATA_PATH } from "../../SupportingTypes";
import { validateArray } from "./validateArray";

/**
 * `mustBeArray()` is a {@link TypeGuarantee}. Use it to ensure that the
 * unknown `input` really is an array of some kind.
 *
 * @param input
 * the value to inspect
 * @param onError
 * If `input` fails validation, we'll pass the error onto this handler.
 * @returns
 * - `input` if validation is successful
 * - does not return if validation fails
 *
 * @category BasicTypes
 */
export const mustBeArray: TypeGuarantee<any[], DataGuaranteeOptions> = (
    input: unknown,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
    }: Partial<DataGuaranteeOptions> = {}
) => mustBe(input, { onError })
    .next((x) => validateArray(path, x))
    .value();