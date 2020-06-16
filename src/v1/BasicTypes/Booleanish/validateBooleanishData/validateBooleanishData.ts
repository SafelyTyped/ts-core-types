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
import { AppErrorOr, DataPath } from "../../..";
import { isObject } from "../../Objects";
import { AnyBooleanishValidator, BooleanishRules } from "../BooleanishRules";
import { BooleanishDataOptions } from "../BooleanishDataOptions";
import { DEFAULT_BOOLEANISH_RULES } from "../defaults/DEFAULT_BOOLEANISH_RULES";
import { createUnsupportedTypeError } from "./createUnsupportedTypeError";

/**
 * `validateBooleanishData()` is a {@link DataValidator}. It attempts to
 * convert the unknown `input` into a boolean.
 *
 * Use it when you accept inputs like `yes | no` that you want to turn into
 * a boolean value.
 *
 * See {@link DEFAULT_BOOLEANISH} for the default conversion rules.
 *
 * @param path
 * where we are in the data structure that you are validating
 * @param input
 * the value to inspect
 * @param booleanish
 * the rules for converting `input` into a boolean value
 * @returns
 * - `true` or `false` if conversion was successful
 * - an {@link AppError} explaining why conversion failed otherwise
 *
 * @category BasicTypes
 */
export function validateBooleanishData(
    path: DataPath,
    input: unknown,
    { booleanish = DEFAULT_BOOLEANISH_RULES }: Partial<BooleanishDataOptions> = {},
): AppErrorOr<boolean> {
    // we need a list of supported types
    const supportedTypes = Object.keys(booleanish);

    // special case - null / undefined
    if (input === null || input === undefined) {
        return createUnsupportedTypeError(path, input, { supportedTypes });
    }

    // special case - classes with their own rules
    if (isObject(input)) {
        const maybeClassValidator = findClassValidator(input, booleanish);
        if (maybeClassValidator !== null) {
            return maybeClassValidator(path, input, { supportedTypes });
        }
    }

    // general case
    const inputType = typeof input;
    if (booleanish[inputType]) {
        return booleanish[inputType](path, input, { supportedTypes });
    }

    // if we get to here, then we have an `input` that we don't know
    // know how to process
    return createUnsupportedTypeError(path, input, { supportedTypes });
}

function findClassValidator(
    input: object,
    booleanish: BooleanishRules
) : AnyBooleanishValidator | null {
    let item = input;

    while (item.constructor !== Object.prototype.constructor) {
        if (booleanish[item.constructor.name]) {
            return booleanish[item.constructor.name];
        }

        item = Object.getPrototypeOf(Object.getPrototypeOf(item));
    }

    return null;
}