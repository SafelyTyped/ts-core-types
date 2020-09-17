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
import { OnError, THROW_THE_ERROR } from "../../ErrorHandling";
import { mustBe } from "../../Operators";
import { DataPath, DEFAULT_DATA_PATH } from "../../SupportingTypes";
import { validateRegExpExecArrayWithGroups } from "./validateRegExpExecArrayWithGroups";
import { RegExpExecArrayWithGroups } from "./RegExpExecArrayWithGroups";

/**
 * `mustBeRegExpExecArrayWithGroups()` is a {@link DataGuarantee}.
 * Use it to prove that the result of {@link RegExp.exec}() included
 * a set of groups.
 *
 * @param {RegExp} regex
 * the regex that the result came from
 * @param {RegExpExecArray} input
 * the result from calling {@link RegExp.exec}
 * @param {OnError} onError
 * we call your `onError()` if `input` does not have any groups
 * @param {DataPath} dataPath
 * where you are in your data structure
 * @returns {RegexExecArray}
 *
 * @category BasicTypes
 */
export function mustBeRegExpExecArrayWithGroups(
    regex: RegExp,
    input: RegExpExecArray,
    {
        onError = THROW_THE_ERROR,
        dataPath = DEFAULT_DATA_PATH
    }: {
        onError?: OnError,
        dataPath?: DataPath
    } = {}
): RegExpExecArrayWithGroups {
    return mustBe(input, {onError})
        .next((x) => validateRegExpExecArrayWithGroups(regex, dataPath, x))
        .value();
}