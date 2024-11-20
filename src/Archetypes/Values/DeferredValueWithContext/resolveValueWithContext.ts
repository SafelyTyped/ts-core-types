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

import { isFunction } from "../../../BasicTypes/Functions/isFunction";
import type { DeferredValueWithContext } from "./DeferredValueWithContext.type";

/**
 * resolveValueWithContext() will return the value from a
 * {@link DeferredValueWithContext}.
 *
 * If `input` is a function, resolveValueWithContext() will call that
 * function. Make sure it has no side-effects!
 *
 * @typeParam T
 * the type of the final value
 * @typeParam IN
 * the type of the context to pass to `input` (if `input` is a function)
 * @typeParam OPTS
 * the type of the optional paramets to pass into `input` (if `input` is a function)
 * @param context
 * the main parameter to pass to `input` (if `input` is a function)
 * @param input
 * the DeferredValueWithContext to evaluate
 * @param opts
 * the optional parameters to pass to `input` (if `input` is a function)
 * @returns the resolved value of `input`
 */
export function resolveValueWithContext<T, IN, OPTS>(
    context: IN,
    input: DeferredValueWithContext<T,IN,OPTS>,
    opts: OPTS
): T
{
    // does the value need resolving?
    if (isFunction(input)) {
        // yes it does
        return input(context, opts);
    }

    return input;
}