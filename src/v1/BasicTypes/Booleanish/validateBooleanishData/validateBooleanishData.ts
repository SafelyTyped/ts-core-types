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
import type { AppErrorOr, DataPath } from "../../../ErrorHandling";
import { searchDispatchMap } from "../../../SupportingTypes";
import { getTypeNames } from "../../Unknowns";
import type { BooleanishDataOptions } from "../BooleanishDataOptions";
import { DEFAULT_BOOLEANISH_RULES } from "../defaults/DEFAULT_BOOLEANISH_RULES";
import { createUnsupportedTypeError } from "./createUnsupportedTypeError";

/**
 * `validateBooleanishData()` is a {@link DataValidator}. It attempts to
 * convert the unknown `input` into a boolean.
 *
 * Use it when you accept inputs like `yes | no` that you want to turn into
 * a boolean value.
 *
 * See {@link DEFAULT_BOOLEANISH_RULES} for the default conversion rules.
 *
 * @param path -
 * where we are in the data structure that you are validating
 * @param input -
 * the value to inspect
 * @param booleanish -
 * the rules for converting `input` into a boolean value
 * @returns
 * - `true` or `false` if conversion was successful
 * - an {@link AppError} explaining why conversion failed otherwise
 *
 * @public
 */
export function validateBooleanishData(
    path: DataPath,
    input: unknown,
    { booleanish = DEFAULT_BOOLEANISH_RULES }: Partial<BooleanishDataOptions> = {},
): AppErrorOr<boolean> {
    // we need a list of supported types
    const supportedTypes = Object.keys(booleanish);

    // we need a list of rules to look for
    const possibleRuleNames = getTypeNames(input);

    // find and execute the matching rule
    return searchDispatchMap(
        booleanish,
        possibleRuleNames,
        (x, y, z) => createUnsupportedTypeError(x, y, z)
    )(
        path,
        input,
        { supportedTypes }
    );
}