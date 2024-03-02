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

import type { AttributeTransformerMap } from "../../UtilityTypes/AttributeTransformerMap";
import type { HashMap } from "../HashMaps/HashMap";

/**
 * `assignOptionalFieldsWithTransformers()` is a data modifier. Use it to
 * copy optional fields from `source` to `target`, using the given
 * `transformers`.
 *
 * If the field doesn't exist on `source`, it isn't created in `target`.
 * This allows you to avoid having `target`'s optional fields all existing
 * and set to `undefined`.
 *
 * `sources` is processed in order. If two or more `source` objects have the
 * same property set, `target` will end up with the property from the last
 * `source` object that has the property set.
 *
 * @param transformers -
 * A map of fields and their transformers.
 * The transformers can be lambdas.
 * @param target -
 * The object to add transformed data to
 * @param sources -
 * The object(s) to copy data from
 *
 * @public
 */
export function assignOptionalFieldsUsingTransformers<
    T extends object,
    S extends object,
    AT extends AttributeTransformerMap<S,T>,
>(
    transformers: AT,
    target: Partial<T>,
    ...sources: S[]
) {
    // IMPLEMENTATION NOTE:
    //
    // We can get away with the typecasts in here because we've already
    // guaranteed type-safety through our parameter types.
    //
    // And we're only using the typecasts in here because the compiler
    // currently can't work this out for itself. It needs our help.

    // this exists only to keep the compiler happy
    const myTarget = target as HashMap<any>;
    const myTransformers = transformers as HashMap<(x: any) => any>;

    for (const source of sources) {
        // a) we assume that `source` is more likely to be smaller than
        //    `transformers`, and
        // b) this avoids using lots of typecasts to get the code to
        //    compile at all!
        for (const key in source) {
            if (key in transformers) {
                // shorthand
                const sourceValue = source[key];
                const transformer = myTransformers[key as keyof object];

                if(typeof sourceValue !== "undefined" && transformer) {
                    // eslint-disable-next-line
                    myTarget[key] = transformer(sourceValue);
                }
            }
        }
    }
}
