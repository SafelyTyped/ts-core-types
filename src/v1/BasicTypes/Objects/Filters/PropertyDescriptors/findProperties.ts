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
import { everyFilter } from "../../../Filters";
import { Prototypes } from "../../../Prototypes";
import type { PropertyDescriptorFilter } from "./PropertyDescriptorFilter";
import type { PropertyDescriptorFilterOptions } from "./PropertyDescriptorFilterOptions";

/**
 * `findProperties()` is a data filter. It returns a list of all properties
 * implemented by `target`'s prototype chain.
 *
 * By default, it also includes any properties inherited from Object.
 *
 * NOTE: if a property exists in multiple places in the prototype chain,
 * `findProperties()` will return the last prototype found. This is probably
 * not the behaviour you are expecting!
 *
 * Use the filter {@link FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE} to
 * avoid this behaviour.
 *
 * @param target -
 * The object to inspect.
 * @param nextPrototype -
 * We use this function to walk the object prototype chain. Use
 * {@link Prototypes.defaults.STOP_AT_OBJECT_PROTOTYPE} if you don't want attributes
 * inherited from Object.
 * @param filters -
 * The filters to apply.
 * @returns
 * - a map of all properties found that were not filtered out.
 *
 * @public
 */
export function findProperties(
    target: object,
    {
        nextPrototype = Prototypes.defaults.NEXT_PROTOTYPE
    }: Partial<PropertyDescriptorFilterOptions> = {},
    ...filters: PropertyDescriptorFilter[]
): Map<string, PropertyDescriptor> {
    // our return value
    const retval = new Map<string, PropertyDescriptor>();

    // what we're currently inspecting
    let obj: object|null = target;

    // continue until we run out of prototype!
    while(obj !== null) {
        // what does this prototype have for us today?
        const props = Object.getOwnPropertyDescriptors(obj);

        // and which ones do we want to keep?
        const propNames = Object.getOwnPropertyNames(obj).filter(
            (propName) => everyFilter(
                {
                    // for some reason, TypeScript thinks obj isn't
                    // an object here
                    obj: obj as object,
                    propName,
                    found: retval
                },
                filters
            )
        );

        // that'll be these ones :)
        for (const propName of propNames) {
            retval.set(propName, props[propName]);
        }

        // next prototype!
        obj = nextPrototype(obj);
    }

    // all done
    return retval;
}
