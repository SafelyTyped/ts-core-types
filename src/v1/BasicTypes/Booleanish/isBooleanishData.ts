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
import { DataGuard } from "../../Archetypes";
import { IS_TYPE_DEFAULT_OPTIONS, isType, IsTypeOptions } from "../../Operators";
import { BooleanishDataOptions } from "./BooleanishDataOptions";
import { DEFAULT_BOOLEANISH_RULES } from "./defaults/DEFAULT_BOOLEANISH_RULES";
import { validateBooleanishData } from "./validateBooleanishData/validateBooleanishData";


/**
 * `isBooleanishData()` is a {@link DataGuard}. Use it to prove that the
 * unknown `input` contains a value that can be converted into a boolean.
 *
 * @param input -
 * the value to inspect
 * @returns
 * - `true` if `input` can be converted to a boolean value
 * - `false` otherwise
 *
 * @public
 */
export const isBooleanishData: DataGuard = (
    input: unknown,
    {
        booleanish = DEFAULT_BOOLEANISH_RULES
    }: Partial<BooleanishDataOptions> = {}
): boolean =>
    isType<boolean, IsTypeOptions & BooleanishDataOptions>(
        validateBooleanishData,
        input,
        { ...IS_TYPE_DEFAULT_OPTIONS, booleanish }
    );