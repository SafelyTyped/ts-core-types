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

import { describe } from "mocha";
import { getOwnKeys } from "@safelytyped/core-types";
import { expect } from "chai";

describe("getOwnKeys()", () => {
    it("returns a list of the keys in the given input object", () => {
        // ----------------------------------------------------------------
        // explain your test

        //

        // ----------------------------------------------------------------
        // setup your test

        const unit = {
            attr1: "this is attr1",
            attr2: "this is attr2",
            attr3: "this is attr3"
        }
        const expectedResult = Object.getOwnPropertyNames(unit);

        // ----------------------------------------------------------------
        // perform the change

        const actualResult = getOwnKeys(unit);

        // ----------------------------------------------------------------
        // test the results

        expect(actualResult).eql(expectedResult);
    });

    it("returns an empty list if the object is empty", () => {
        // ----------------------------------------------------------------
        // explain your test

        //

        // ----------------------------------------------------------------
        // setup your test

        const unit = {};
        const expectedResult: string[] = [];

        // ----------------------------------------------------------------
        // perform the change

        const actualResult = getOwnKeys(unit);

        // ----------------------------------------------------------------
        // test the results

        expect(actualResult).eql(expectedResult);
    })
});