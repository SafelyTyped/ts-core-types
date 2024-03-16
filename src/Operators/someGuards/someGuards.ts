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

import type { DataGuard } from "../../Archetypes/FunctionTypes/DataGuard/DataGuard";
import type { DataGuardOptions } from "../../Archetypes/FunctionTypes/DataGuard/DataGuardOptions";

/**
 * `someGuards()` is an operator. Use it to apply a set of {@link DataGuard}
 * to the `input` value.
 *
 * We stop (and return `true`) as soon as one of the guards returns `true`.
 *
 * @typeParam IN
 * the type of input value that each guard accepts
 * @typeParam OUT
 * the return type of your guards
 * @typeParam OPT
 * the type of options that your guards accept
 * @param input -
 * the value to be inspected
 * @param guards -
 * a list of guards to be applied
 * @returns
 * - `true` if any guard returns `true`
 * - `false` otherwise
 *
 * @public
 */
export function someGuards<IN, OUT extends IN = IN, OPT extends DataGuardOptions = DataGuardOptions>(
    guards: DataGuard<IN, OUT, OPT>[],
    input: IN,
    options?: OPT,
): boolean {
    for (const guard of guards) {
        if (guard(input, options)) {
            return true;
        }
    }

    return false;
}