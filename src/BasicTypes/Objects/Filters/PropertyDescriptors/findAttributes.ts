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
import { NEXT_PROTOTYPE } from "../../../Prototypes/defaults/NEXT_PROTOTYPE";
import {
    FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES,
} from "../defaults/FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES";
import {
    FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE,
} from "../defaults/FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE";
import { findProperties } from "./findProperties";
import type { PropertyDescriptorFilter } from "./PropertyDescriptorFilter";
import type { PropertyDescriptorFilterOptions } from "./PropertyDescriptorFilterOptions";

/**
 * `findAttributes()` is a data filter. It returns a list of all attributes
 * stored in `target`, including attributes inherited from any parent
 * classes.
 *
 * By default, it also includes any attributes inherited from Object.
 *
 * @param input -
 * The object to inspect.
 * @param nextPrototype -
 * We use this function to walk the object prototype chain. Use
 * {@link STOP_AT_OBJECT_PROTOTYPE} if you don't want attributes
 * inherited from Object.
 * @returns
 * - a Map of all attributes found. Where an attribute has been defined in
 *   multiple prototypes, you'll get the one earliest in the prototype
 *   chain (ie the one defined directly on the object, or in a child class)
 *
 * @public
 */
export function findAttributes(
    input: object,
    {
        nextPrototype = NEXT_PROTOTYPE
    }: PropertyDescriptorFilterOptions = {},
    ...filters: PropertyDescriptorFilter[]
): Map<string, PropertyDescriptor> {
    return findProperties(
        input,
        { nextPrototype },
        FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES,
        FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE,
        // plus any filters provided by our caller
        ...filters
    );
}
