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
import { pickProperties } from "@safelytyped/core-types";
import { expect } from "chai";

describe("pickProperties", () => {
    it("copies the given properties to a new object", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this test proves that pickProperties() does actually copy over
        // the properties that we want

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
        }
        const expectedValue = {
            a: 100,
            d: 400,
        }
        const expectedKeys = [ "a", "d" ];

        // ----------------------------------------------------------------
        // perform the change

        const actualValue = pickProperties(unit, expectedKeys);

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).eqls(expectedValue);
    });

    it("only returns the properties that are requested", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this test proves that pickProperties() doesn't return any
        // unexpected properties

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
        }
        const expectedKeys = [ "a", "d" ];

        // ----------------------------------------------------------------
        // perform the change

        const actualValue = pickProperties(unit, expectedKeys);
        const actualKeys = Object.getOwnPropertyNames(actualValue);

        // ----------------------------------------------------------------
        // test the results

        expect(actualKeys).eqls(expectedKeys);
    });

    it('does not modify the input object', () => {
        // ----------------------------------------------------------------
        // explain your test

        // this test proves that our original input object is not changed
        // when we call pickProperties()

        // ----------------------------------------------------------------
        // setup your test

        const expectedInput = {
            a: 100,
            b: 200,
            c: 300,
            d: 400,
        }
        const expectedKeys = [ "a", "d" ];

        // create a copy of our object, so that we have something to use
        // in the comparison
        const actualInput = {
            ...expectedInput
        }

        // ----------------------------------------------------------------
        // perform the change

        pickProperties(actualInput, expectedKeys);

        // ----------------------------------------------------------------
        // test the results

        expect(actualInput).eqls(expectedInput);
    })
});