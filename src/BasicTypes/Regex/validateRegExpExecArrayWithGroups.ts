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

import type { DataValidatorOptions } from "../../Archetypes/FunctionTypes/DataValidator/DataValidatorOptions";
import type { AppErrorOr } from "../../ErrorHandling/AppErrorOr/AppErrorOr";
import { DEFAULT_DATA_PATH } from "../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import { RegexReturnedNoNamedGroupsError } from "../../Errors/RegexReturnedNoNamedGroups/RegexReturnedNoNamedGroupsError";
import { isObject } from "../Objects/isObject";
import type { RegExpExecArrayWithGroups } from "./RegExpExecArrayWithGroups";

/**
 * `validateRegExpExecArrayWithGroups()` is a {@link DataValidator}. Use it to
 * prove that your `RegExpExecArray` definitely has a `groups`
 * field.
 *
 * @param regex -
 * the regex that your `RegExpExecArray` came from
 * @param path -
 * where you are in the data structure that you are validating
 * @param input -
 * the data structure to validate
 * @returns
 * - `input` if it has a `groups` field
 * - a `RegexReturnedNoNamedGroupsError` otherwise
 *
 * @public
 */
export function validateRegExpExecArrayWithGroups
(
    regex: RegExp,
    input: RegExpMatchArray,
    {
        path = DEFAULT_DATA_PATH
    }: DataValidatorOptions = {}
): AppErrorOr<RegExpExecArrayWithGroups>
{
    if (!isObject(input.groups)) {
        return new RegexReturnedNoNamedGroupsError({
            logsOnly: {
                dataPath: path,
                regex: regex.source,
            }
        });
    }

    return input as RegExpExecArrayWithGroups;
}