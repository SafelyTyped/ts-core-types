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
import { DataGuarantee, FunctionalOption } from "../../FunctionTypes";
import { MakeNominalTypeOptions } from "./MakeNominalTypeOptions";
import { THROW_THE_ERROR } from "../../../ErrorHandling";
import { DEFAULT_DATA_PATH } from "../../../SupportingTypes";

/**
 * `makeNominalType()` converts your input type into a branded or
 * flavoured type. Use this to create smart constructors.
 *
 * @category Archetypes
 * @param contract
 * This will be called to make sure that `input` contains valid data for
 * your nominal type.
 * Make sure that it has no side-effects whatsoever.
 * @param input
 * The data to brand or flavour.
 * @param onError
 * If `input` is rejected by the `contract`, we'll call this with an
 * `AppError` to explain why.
 * @param path
 * Where are you in the data structure you're creating?
 * @param options
 * The remaining user-supplied options. They will be passed into any `fnOpts`.
 * @param fnOpts
 * A (possibly empty) list of user-supplied functional options. These will
 * be applied once the `contract()` has successfully validated the `input`
 * data.
 * @template IN
 * The data type that the smart constructor accepts.
 * @template OUT
 * The data type that the smart constructor produces.
 * @template OPT
 * The data type for the user-supplied options.
 */
export function makeNominalType<IN, OUT, OPT extends object = object>(
    contract: DataGuarantee<IN, OPT>,
    input: IN,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
        ...options
    }: Partial<MakeNominalTypeOptions> & Partial<OPT> = {},
    ...fnOpts: FunctionalOption<IN|OUT, OPT>[]
): OUT {
    // enforce the contract
    contract(input, { onError, path, ...options });

    // prepare our return value
    let retval: IN|OUT = (input as unknown) as OUT;

    // shorthand
    const optsForFnOpts = { onError, path, ...options } as OPT;

    // apply the functional options
    //
    // we don't use `applyFunctionalOptions()` here, because
    // we need this type-cast to support IN|OUT
    fnOpts.forEach((fnOpt) => {
        retval = (fnOpt(retval, optsForFnOpts) as OUT);
    });

    // we have to re-cast here, because the compiler isn't sure
    // whether `retval` is IN or OUT
    return (retval as unknown) as OUT;
}