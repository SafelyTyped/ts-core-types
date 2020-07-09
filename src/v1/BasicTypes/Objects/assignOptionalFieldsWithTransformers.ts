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
import { AttributeTransformers, TransformedAttributes } from "../../Archetypes";

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
 * NOTE: if the compiler is telling you that there's a problem with `target',
 * it can be caused by two things:
 *
 * 1. one of your mapping functions returns a type that's incompatible with
 *    your `target`'s type, or
 * 2. your mapping functions are lambdas
 *
 * Tour transformers cannot be lamdas; TypeScript 3.9's type inference
 * isn't powerful enough to make that work. They need to be pre-defined
 * functions or pre-defined arrow functions.
 *
 * @param transformers
 * A map of fields and their transformers
 * @param target
 * The object to add transformed data to
 * @param sources
 * The object(s) to copy data from
 *
 * @template T
 * This interface describes the fields created by the transformers
 * listed in `AT`. The compiler will compute this for you.
 * @template S
 * This type describes the object(s) that we will copy from. The compiler
 * will work this out for you.
 * @template AT
 * This interface describes the transformers used to convert from type `S`
 * to type `T`. The compiler will work this out for you.
 *
 * @category BasicTypes
 */
export function assignOptionalFieldsWithTransformers<
    T extends TransformedAttributes<S, AT>,
    S extends object,
    AT extends AttributeTransformers<S>,
>(
    transformers: AT,
    target: Partial<T>,
    ...sources: S[]
): Partial<T>  {
    for (const source of sources) {
        // a) we assume that `source` is more likely to be smaller than
        //    `transformers`, and
        // b) this avoids using lots of typecasts to get the code to
        //    compile at all!
        for(const key in source) {
            if (key in transformers) {
                const value = source[key];
                const transformer = transformers[key];

                if(typeof value !== "undefined") {
                    target[key] = transformer(value as Extract<S,string>);
                }
            }
        }
    }

    // all done
    return target;
}
