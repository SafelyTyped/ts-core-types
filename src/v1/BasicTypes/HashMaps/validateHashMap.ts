//
// Copyright (c) 2022-present Ganbaro Digital Ltd
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

import type { TypeValidator } from "../../Archetypes";
import type { AppErrorOr } from "../../ErrorHandling";
import { AppError, DataPath, extendDataPath, isAppError } from "../../ErrorHandling";
import { validateObject } from "../Objects";
import { HashMap } from "./HashMap";

export function validateHashMap<T>(
    valueValidator: TypeValidator<T>,
    path: DataPath,
    input: unknown
): AppErrorOr<HashMap<T>> {
    // do we have an object?
    const objRes = validateObject(path, input);
    if (isAppError(objRes)) {
        return objRes;
    }

    // at this point, we know that our input is an object
    const inputObj = input as HashMap<unknown>;

    // our return value
    let retval: AppErrorOr<HashMap<T>> = input as HashMap<T>;

    // this will stop at the first error we run into
    Object.keys(input as object).every((key, index) => {
        const keyPath = extendDataPath(path, `['${index}']`);
        const res = valueValidator(keyPath, inputObj[key], {});

        // do we have a problem?
        if (res instanceof AppError) {
            retval = res;
            return false;
        }

        // no we do not, so on to the next value
        return true;
    });

    // all done
    return retval;
}