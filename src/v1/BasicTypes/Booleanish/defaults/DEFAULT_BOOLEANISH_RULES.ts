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

import type { BooleanishRules } from "../BooleanishRules/BooleanishRules";
import { validateBooleanishBoolean } from "../validateBooleanishData";
import { validateBooleanishNumber } from "../validateBooleanishData";
import { validateBooleanishString } from "../validateBooleanishData";
import { validateBooleanishObject } from "../validateBooleanishData";

/**
 * `DEFAULT_BOOLEANISH_STRING_RULES` specify which strings we can convert
 * to either `true` or `false`.
 *
 * Values in the rules must be in lower case, or they will not work.
 *
 * @public
 */
export const DEFAULT_BOOLEANISH_STRING_RULES = {
    false: [ "0", "false", "no", "off", "nack", "narp" ],
    true: ["1", "true", "yes", "on", "ack", "yarp" ],
};

/**
 * `DEFAULT_BOOLEANISH` contains the default set of rules for converting
 * different types into a boolean value.
 *
 * See {@link validateBooleanishData} to see it in action.
 *
 * @public
 */
export const DEFAULT_BOOLEANISH_RULES: BooleanishRules = {
    boolean: validateBooleanishBoolean,
    number: (path, input: number) => validateBooleanishNumber(
        {
            false: 0,
            true: 1,
        },
        path,
        input,
    ),
    string: (path, input: string) => validateBooleanishString(
        DEFAULT_BOOLEANISH_STRING_RULES,
        path,
        input,
    ),
    Object: (path, input: object, { supportedTypes }) => validateBooleanishObject(
        DEFAULT_BOOLEANISH_STRING_RULES,
        supportedTypes,
        path,
        input,
    )
};
