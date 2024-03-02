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

import { RefinedPrimitive } from "../RefinedPrimitive/RefinedPrimitive";
import type { DataGuaranteeOptions } from "../../Archetypes/FunctionTypes/DataGuarantee/DataGuaranteeOptions";
import type { ToPrimitive } from "../../Protocols/ToPrimitive/ToPrimitive";
import type { PrimitiveHint } from "../../Protocols/ToPrimitive/PrimitiveHint";

/**
 * `RefinedNumber` is a base class for defining a subset of numbers.
 * The subset is enforced by a {@link DataGuarantee}.
 *
 * @typeParam OPT -
 * This is the type of user-supplied options that the `contract`
 * (parameter to the constructor) accepts.
 *
 * @public
 */
export class RefinedNumber<OPT extends DataGuaranteeOptions = DataGuaranteeOptions>
    extends RefinedPrimitive<number, OPT>
    implements ToPrimitive {

    public [ Symbol.toPrimitive ](hint: PrimitiveHint): string | number {
        if (hint === "string") {
            return this._value.toString();
        }

        return this._value;
    }
}