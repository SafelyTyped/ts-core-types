//
// Copyright (c) 2024-present Ganbaro Digital Ltd
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

import type { HashMap } from "../HashMaps/HashMap";
import { hasProperty } from "./hasProperty";

/**
 * `pickProperties()` is a utility function for objects. It will return a new
 * object that only contains the given list of `keysToPick` properties found
 * in the given `input`.
 *
 * If a property does not exist on `input`, it will not exist on the returned
 * object either.
 *
 * @param input -
 * the object to copy properties from
 * @param keysToPick -
 * the list of property names to copy from `input`
 * @returns
 * a new object, containing copies of the given properties from `input`
 */
export function pickProperties(
    input: object,
    keysToPick: string[]
): object
{
    const retval: HashMap<string> = {}

    for(var i = 0, length = keysToPick.length; i < length; i++) {
        var keyToPick = keysToPick[i];
        if (hasProperty(input, keyToPick)) {
            retval[keyToPick] = (input as HashMap<string>)[keyToPick];
        }
    }

    return retval;
}