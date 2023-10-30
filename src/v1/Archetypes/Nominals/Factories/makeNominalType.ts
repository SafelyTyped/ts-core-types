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
import { applyFunctionalOptions, DataGuarantee, FunctionalOption } from "../../FunctionTypes";
import type { MakeNominalTypeOptions } from "./MakeNominalTypeOptions";
import { THROW_THE_ERROR } from "../../../ErrorHandling";
import { DEFAULT_DATA_PATH } from "../../../SupportingTypes";

/**
 * `makeNominalType()` converts your input type into a branded or
 * flavoured type. Use this to create smart constructors.
 *
 * @public
 * @param contract -
 * This will be called to make sure that `input` contains valid data for
 * your nominal type.
 * Make sure that it has no side-effects whatsoever.
 * @param input -
 * The data to brand or flavour.
 * @param onError -
 * If `input` is rejected by the `contract`, we'll call this with an
 * `AppError` to explain why.
 * @param path -
 * Where are you in the data structure you're creating?
 * @param options -
 * The remaining user-supplied options. They will be passed into any `fnOpts`.
 * @param fnOpts -
 * A (possibly empty) list of user-supplied functional options. These will
 * be applied once the `contract()` has successfully validated the `input`
 * data.
 * @typeParam IN -
 * The data type that the smart constructor accepts.
 * @typeParam OUT -
 * The data type that the smart constructor produces.
 * @typeParam OPT -
 * The data type for the user-supplied options.
 */
export function makeNominalType<IN, OUT, OPT extends MakeNominalTypeOptions = MakeNominalTypeOptions>(
    contract: DataGuarantee<IN, OPT>,
    input: IN,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
        ...options
    }: Partial<OPT> = {},
    ...fnOpts: FunctionalOption<IN|OUT, OPT>[]
): OUT {
    // shorthand
    //
    // the typecast is required since Typescript 4.0
    const opts = { onError, path, ...options } as OPT;

    // enforce the contract
    contract(input, opts);

    // apply any functional options we've been given
    return applyFunctionalOptions<IN|OUT, OPT>(input, opts, ...fnOpts) as OUT;
}