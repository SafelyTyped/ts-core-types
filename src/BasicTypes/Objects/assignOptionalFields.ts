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

import type { AttributeFilterMap } from "../../UtilityTypes/AttributeFilterMap";
import type { EquivalentOptionalPart } from "../../UtilityTypes/EquivalentOptionalPart";

/**
 * `updateObjectWithOptionalFields()` is a data modifier. It adds any
 * of the fields that exist on each `source` to `target`.
 *
 * A field gets copied if:
 *
 * - it is in `fieldsList`, and
 * - it exists in `source` with any value except `undefined`
 *
 * The idea here is to avoid adding lots of `undefined` fields to `target`.
 * Use it to populate objects where you have optional fields.
 *
 * `sources` is processed in order. If two or more `source` objects have the
 * same property set, `target` will end up with the property from the last
 * `source` object that has the property set.
 *
 * @param fieldsList -
 * The list of fields you want to copy from `source` to `target`.
 * It can only contain fields that are equivalent in both `source` and
 * `target`. Set the field value to `true` to trigger a copy, and `false`
 * to avoid a copy. You can also just omit the field if you don't want it
 * to be copied from `source` to `target`.
 * @param target -
 * The object to modify.
 * @param sources -
 * The object(s) to copy from.
 *
 * @public
 */
export function assignOptionalFields<
    S extends object,
    T extends object,
> (
    fieldsList: AttributeFilterMap<EquivalentOptionalPart<S,T>>,
    target: T,
    ...sources: S[]
) {
    for (const source of sources) {
        for (const key in fieldsList) {
            if (key in source && fieldsList[key as keyof object]) {
                const value = source[key as keyof object];

                if (typeof value !== "undefined") {
                    target[key as keyof object] = value;
                }
            }
        }
    }
}
