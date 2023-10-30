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

import type { ProtocolDefinition } from "./ProtocolDefinition";
import { getPublicMethodNames, isNonEmptyArray } from "../../BasicTypes";
import { type OnErrorOptions, THROW_THE_ERROR } from "../../ErrorHandling";
import { ExtensionDefinesNoMethodsError } from "../../Errors";

/**
 * `makeProtocolDefinition()` is a type factory. Use it to build a
 * {@link ProtocolDefinition}.
 *
 * It *WILL* pick up methods defined in parent classes too.
 *
 * Recommended practice: use this to define a file-level constant for
 * your protocol.
 *
 * @param input -
 * This is the prototype of an Extension.
 * @param onError -
 * We'll call this with an AppError if there's a problem with `input`.
 * @returns
 * The list of methods that make up the Protocol.
 *
 * @public
 */
export function makeProtocolDefinition<T extends object>(
    input: T,
    { onError = THROW_THE_ERROR }: Partial<OnErrorOptions> = {}
): ProtocolDefinition {
    // what methods does this object define?
    const methodsList = getPublicMethodNames(input);

    // we don't allow empty protocols
    if (isNonEmptyArray(methodsList)) {
        return methodsList;
    }

    throw onError(new ExtensionDefinesNoMethodsError({
        public: {
            extension: input.constructor?.name || "object has no prototype",
        }
    }));
}
