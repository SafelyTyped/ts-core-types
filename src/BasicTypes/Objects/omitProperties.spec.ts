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
import { omitProperties } from "@safelytyped/core-types";
import { expect } from "chai";

describe("omitProperties()", () => {
    it("returns an object only containing the requested properties", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this test proves that omitProperties() returns only the properties
        // that we requested

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
            e: 500,
        }
        const expectedResult = {
            a: unit.a,
            c: unit.c
        }
        const keysToOmit = [ "b", "d", "e" ];

        // ----------------------------------------------------------------
        // perform the change

        const actualResult = omitProperties(unit, keysToOmit)

        // ----------------------------------------------------------------
        // test the results

        expect(actualResult).eql(expectedResult);
    });

    it("does not modify the input object", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this test proves that our input object is not changed by
        // the omitProperties() function

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
            e: 500,
        }
        const input = { ...unit };
        const keysToOmit = [ "b", "d", "e" ];

        // ----------------------------------------------------------------
        // perform the change

        omitProperties(input, keysToOmit)

        // ----------------------------------------------------------------
        // test the results

        expect(input).eql(unit);
    });

});