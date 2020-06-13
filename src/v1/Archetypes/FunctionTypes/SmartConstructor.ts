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
import { OnErrorOptions } from "../../ErrorHandling";
import { FunctionalOption } from "./FunctionalOption";

/**
 * `SmartConstructorOptions` is the default user-supplied options type for
 * {@link SmartConstructor}'s `OPT` template type.
 *
 * @category Archetypes
 */
export type SmartConstructorOptions = OnErrorOptions;

/**
 * `SmartConstructor` is a function signature. It describes a function that
 * creates a safe type from the given input.
 *
 * If anything goes wrong, the user-supplied `onError` handler is called,
 * with details about the error that occurred.
 *
 * @category Archetypes
 * @template IN
 * The data type that the smart constructor accepts.
 * @template OUT
 * The data type that the smart constructor produces.
 * @template OPT
 * The data type for the user-supplied options.
 * Defaults to `SmartConstructorOptions`.
 * @template FN
 * The data type that the functional options can process.
 * {@link makeNominalType} sets this to `IN|OUT`
 * Defaults to OUT.
 * @param input
 * The data to use to build our safe type.
 * @param onError
 * The OnError handler to call if something goes wrong.
 * @param fnOptions
 * User-supplied functional options.
 * @returns
 * The constructed type.
 */
export type SmartConstructor<IN, OUT, OPT = SmartConstructorOptions, FN = OUT> = (
    input: IN,
    options?: OPT,
    ...fnOptions: FunctionalOption<FN, OPT>[]
) => OUT;

/**
 * `AnySmartConstructor` is a type alias. Use it in function signatures
 * when your function will accept any possible SmartConstructor as
 * a parameter.
 *
 * @category Archetypes
 */
export type AnySmartConstructor = SmartConstructor<any, any, any, any>;
