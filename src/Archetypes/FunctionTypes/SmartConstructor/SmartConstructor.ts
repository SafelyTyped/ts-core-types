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

import type { FunctionalOption } from "../FunctionalOption/FunctionalOption";
import type { SmartConstructorOptions } from "./SmartConstructorOptions";

/**
 * `SmartConstructor` is a function signature. It describes a function that
 * creates a safe type from the given input.
 *
 * If anything goes wrong, the user-supplied `onError` handler is called,
 * with details about the error that occurred.
 *
 * @public
 * @typeParam IN -
 * The data type that the smart constructor accepts.
 * @typeParam OUT -
 * The data type that the smart constructor produces.
 * @typeParam OPT -
 * The data type for the user-supplied options.
 * Defaults to `SmartConstructorOptions`.
 * @typeParam FN - The input data type that the functional options can process.
 * Defaults to `OUT`.
 * @typeParam FN_OPT -
 * The type of user-supplied options that the functional options can process.
 * Defaults to `OPT`
 * @param input -
 * The data to use to build our safe type.
 * @param onError -
 * The OnError handler to call if something goes wrong.
 * @param fnOptions -
 * User-supplied functional options.
 * @returns
 * The constructed type.
 */
export type SmartConstructor<IN, OUT, OPT extends SmartConstructorOptions = SmartConstructorOptions, FN = OUT, FN_OPT extends SmartConstructorOptions = OPT> = (
    input: IN,
    options?: OPT,
    ...fnOptions: FunctionalOption<FN, FN_OPT>[]
) => OUT;
