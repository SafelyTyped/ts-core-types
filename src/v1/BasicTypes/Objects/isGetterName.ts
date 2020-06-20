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

// This code has been adapted from:
//
// https://stackoverflow.com/a/47714550

/**
 * `isGetter()` is a data guard. Use it to determine if the named method
 * is a data accessor.
 *
 * @param target
 * the object to inspect
 * @param methodName
 * the name of the method to inspect
 * @returns
 * - `true` if `target.methodName()` is a getter.
 * - `false` otherwise
 * @template T
 * This is the type of object to inspect. We need it so that `methodName`
 * is correctly typed / enforced by the compiler. You shouldn't need to
 * provide `T` yourself; the compiler's type-inference should handle it
 * for you automagically.
 *
 * @category BasicTypes
 */
export function isGetterName<T extends object>(target: T, methodName: keyof T): boolean {
    // this is the object we are going to be looking at
    let obj = target;

    // we continue until we run out of prototypes to examine
    while (obj !== null) {
        // do we have a winner?
        const propDesc = Object.getOwnPropertyDescriptor(obj, methodName);
        if (propDesc) {
            return propDesc.get !== undefined;
        }

        // next prototype!
        obj = Object.getPrototypeOf(obj);
    }

    return false;
}
