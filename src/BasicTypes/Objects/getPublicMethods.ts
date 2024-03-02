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
import { FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS } from "./Filters/PropertyDescriptors/defaults/FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS";
import { findMethods } from "./Filters/PropertyDescriptors/findMethods";
import {
    FIND_PROPERTIES_FILTER_DROP_INTERNAL,
} from "./Filters/defaults/FIND_PROPERTIES_FILTER_DROP_INTERNAL";

/**
 * `getPublicMethods()` is a data filter. It returns a list of all
 * methods that form the object's public API.
 *
 * - all methods defined on `target` and its base classes (inc
 *   Object.prototype)
 * - that don't start with an underscore (ie suggest they're protected
 *   or private)
 *
 * Getters and Setters are NOT treated as public methods.
 *
 * NOTE: unlike {@link getPublicMethodNames}, we keep the object's
 * constructor (if it has one). It's useful for getting the name of
 * the underlying class.
 *
 * @param target -
 * The object to inspect.
 * @returns
 * A list of all method names that exist on the object instance. Order of
 * the list is not guaranteed. The list will not contain duplicates.
 *
 * @public
 */
export function getPublicMethods(
    target: object
): Map<string, PropertyDescriptor> {
    return findMethods(
        target,
        FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS,
        FIND_PROPERTIES_FILTER_DROP_INTERNAL,
    );
}