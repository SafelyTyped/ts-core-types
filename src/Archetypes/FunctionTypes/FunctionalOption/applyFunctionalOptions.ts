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

import type { EmptyObject } from "../../../BasicTypes/Objects/EmptyObject";
import type { FunctionalOption } from "./FunctionalOption";

/**
 * `applyFunctionalOptions()` is a helper function. Wrap this around
 * your class's smart constructor, to add support for functional options.
 *
 * @public
 * @typeParam T -
 * `T` is the input & output type that your functional options must support
 * @typeParam OPT -
 * `OPT` is the type of user-supplied options that your functional options
 * must support
 * @param input
 * - The initial value to apply functional options to.
 * @param options
 * - The optional parameters to pass into the functional options.
 * @param fnOpts
 * - The list of functional options to apply.
 * @returns
 * The (possibly) modified `input`.
 */
export const applyFunctionalOptions = <T, OPT extends object = EmptyObject>(
    input: T,
    options?: OPT,
    ...fnOpts: FunctionalOption<T,OPT>[]
) => {
    // apply the options (if we have any)
    fnOpts.forEach((fnOpt) => { input = fnOpt(input, options); });

    // all done
    return input;
};
