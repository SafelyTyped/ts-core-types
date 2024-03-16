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

import type { DataGuarantee } from "../../Archetypes/FunctionTypes/DataGuarantee/DataGuarantee";
import type { DataGuaranteeOptions } from "../../Archetypes/FunctionTypes/DataGuarantee/DataGuaranteeOptions";
import { ValueObject } from "../../Archetypes/Values/ValueObject/ValueObject";

/**
 * `RefinedType` is a base class for defining a subset of any given type.
 * The subset is enforced by a {@link DataGuarantee}.
 *
 * If you are refining a `string` or a `number`, use {@link RefinedString} or
 * {@link RefinedNumber} as your base class instead. They contain additional
 * methods to help JavaScript auto-resolve to the wrapped primitive wherever
 * possible.
 *
 * @typeParam T - This is the type that will be wrapped.
 * @typeParam OPT - This is the type of user-supplied options that the
 * `contract` accepts.
 *
 * @public
 */
export class RefinedType<IN, OUT, OPT extends DataGuaranteeOptions = DataGuaranteeOptions> extends ValueObject<OUT> {
    /**
     * Constructor. Creates a new `RefinedType`.
     *
     * @param contract -
     * This is the function that enforces the contract / specification of
     * this refined type.
     *
     * Child classes normally decide what this will be. You don't
     * normally allow the end-caller to pass this in.
     *
     * @param input -
     * This is the value that will be stored, if it passes the `contract`.
     *
     * @param options -
     * The options that need to be passed into the contract. Pass in
     * {@link IS_DATA_DEFAULT_OPTIONS} if you want to use the contract's
     * default options.
     */
    public constructor(
        contract: DataGuarantee<IN, OUT, OPT>,
        input: IN,
        options: OPT,
    ) {
        // enforce the contract
        const res = contract(input, options);

        // we're good to go
        super(res);
    }
}