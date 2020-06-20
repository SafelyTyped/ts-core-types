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
import { isMethod } from "./isMethod";


// This code has been adapted from:
//
// https://stackoverflow.com/a/47714550

/**
 * `getAllMethodNames()` is a data filter. It returns a list of all methods
 * implemented by `target`, including methods inherited from any parent
 * classes and from `Object.prototype`.
 *
 * @template T
 * The type of object to inspect. This is used internally to convince
 * the Typescript compiler to let us access individual properties on
 * `target`. You shouldn't have to supply this yourself. The Typescript
 * compiler's type-inference should handle this auto-magically.
 * @param target
 * The object to inspect.
 * @returns
 * - a list of all methods found. The order of the results is not
 *   guaranteed. The list will not contain duplicate names.
 *
 * @category BasicTypes
 */
export function getAllMethodNames<T extends object>(target: T): string[] {
    // this list will include duplicate names if:
    //
    // - a method has been overridden in a child class
    const allMethods = extractMethodNames(target);

    // so lets dedupe it before we return it!
    return Array.from(new Set(allMethods));
}

/**
 * `extractMethodNames()` returns a list of all methods found in:
 *
 * - target
 * - target's base classes
 * - and the Object.prototype
 *
 * @template T
 * The type of object to inspect. This is used internally to convince
 * the Typescript compiler to let us access individual properties on
 * `target`. You shouldn't have to supply this yourself. The Typescript
 * compiler's type-inference should handle this auto-magically.
 * @param target
 * The object to inspect.
 * @returns
 * - a list of all methods found. The order of the results is not
 *   guaranteed. The list CAN contain duplicate names.
 *
 * @ignore
 * @internal
 */
function extractMethodNames<T extends object>(target: T): string[] {
    return (
        // this ensures we stop when we reach 'null'
        target
        && Object.getOwnPropertyNames(target).filter(
            (name) => isMethod(target, name as keyof T)
        )
        .concat(extractMethodNames(Object.getPrototypeOf(target)))
     ) || [];
}
