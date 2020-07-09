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
import { ArrayCannotBeEmptyError } from "../../Errors";
import { validate } from "../../Operators";
import { AppErrorOr } from "../../OptionTypes";
import { DataPath } from "../../SupportingTypes";
import { NonEmptyArray } from "./NonEmptyArray";
import { validateArray } from "./validateArray";

/**
 * `validateNonEmptyArray()` is a {@link TypeValidator}. Use it to prove that
 * an unknown `input` really is some kind of array that contains at least
 * one entry.
 *
 * @param path
 * Where we are in the data structure you are validating
 * @param input
 * the value to inspect
 * @returns
 * - `input` if it is an array with at least one entry, or
 * - an AppError explaining why validation failed
 *
 * @category BasicTypes
 */
export function validateNonEmptyArray<T = any>(path: DataPath, input: unknown): AppErrorOr<NonEmptyArray<T>> {
    return validate(input)
        .next((x) => validateArray(path, x))
        .next((x) => validateArrayIsNotEmpty(path, x))
        .value();
}

function validateArrayIsNotEmpty<T = any>(path: DataPath, input: any[]): AppErrorOr<NonEmptyArray<T>> {
    if (input.length > 0) {
        return input as NonEmptyArray<T>;
    }

    // hate to be the bearer of bad news ...
    return new ArrayCannotBeEmptyError({
        public: {
            dataPath: path,
        }
    });
}