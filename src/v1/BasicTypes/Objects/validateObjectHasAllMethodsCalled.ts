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
import { ObjectHasMissingMethodsError } from "../../Errors";
import { AppErrorOr } from "../../OptionTypes";
import { DataPath } from "../../SupportingTypes";
import { isNonEmptyArray } from "../Arrays";
import { getMissingMethodNames } from "./getMissingMethodNames";


/**
 * `validateObjectHasMethodsCalled()` is a data guard. Use it to make sure
 * that the given `target` object defines all of the named methods.
 *
 * Supports methods inherited from parent classes.
 *
 * @param target
 * The object to inspect.
 * @param names
 * The list of names to look for.
 * @returns
 * - `true` if all of the names are methods on `target`
 * - `false` otherwise
 *
 * @category BasicTypes
 */
export function validateObjectHasAllMethodsCalled<T extends object>(
    path: DataPath,
    target: object,
    names: string[],
): AppErrorOr<T> {
    // what's missing?
    const missingMethods = getMissingMethodNames(target, names);

    // anything?
    if (isNonEmptyArray(missingMethods)) {
        return new ObjectHasMissingMethodsError({
            public: {
                path,
                missingMethods
            }
        });
    }

    // if we get here, we're all good
    return target as T;
}