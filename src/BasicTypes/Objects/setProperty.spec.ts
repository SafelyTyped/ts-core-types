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

import { describe, it } from "mocha";
import { expect } from "chai";
import { setProperty } from "@safelytyped/core-types";

describe("setProperty()", () => {
    it("supports string property names", () => {
        // ----------------------------------------------------------------
        // explain your test

        //

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            a: "1",
            b: "2",
            c: "3"
        }
        const expectedValue = "4";

        // ----------------------------------------------------------------
        // perform the change

        setProperty(unit, "c", expectedValue);
        const actualValue = unit.c;

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).eql(expectedValue);
    });

    it("supports numeric property names", () => {
        // ----------------------------------------------------------------
        // explain your test

        //

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            1: "a",
            2: "b",
            3: "c",
        }
        const expectedValue = "d";

        // ----------------------------------------------------------------
        // perform the change

        setProperty(unit, 3, expectedValue);
        const actualValue = unit[3];

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).eql(expectedValue);
    });

    it("supports symbol property names", () => {
        // ----------------------------------------------------------------
        // explain your test

        //

        // ----------------------------------------------------------------
        // setup your test

        const sym1 = Symbol("sym1");
        const sym2 = Symbol("sym2");
        const sym3 = Symbol("sym3");

        const unit = {
            [sym1]: "a",
            [sym2]: "b",
            [sym3]: "c"
        }
        const expectedValue = "d";

        // ----------------------------------------------------------------
        // perform the change

        setProperty(unit, sym3, expectedValue);
        const actualValue = unit[sym3];

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).eql(expectedValue);
    })
});