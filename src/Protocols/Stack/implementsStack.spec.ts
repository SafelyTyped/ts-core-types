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

import { describe } from "mocha";
import { expect } from "chai";

import { implementsStack } from "@safelytyped/core-types";

describe("implementsStack()", () => {
    it("returns `true` for an Error", () => {
        const inputValue = new TypeError("this is just a test");
        const expectedValue = true;

        const actualValue = implementsStack(inputValue);
        expect(actualValue).to.equal(expectedValue);
    });

    it("returns `true` for an object with a string `stack` property", () => {
        const inputValue = { stack: "this isn't really a stack"};
        const expectedValue = true;

        const actualValue = implementsStack(inputValue);
        expect(actualValue).to.equal(expectedValue);
    });

    [
        null,
        undefined,
        [ 1, 2, 3, ],
        100,
        3.14,
        { },
        { stack: 100 },
        "hello world!",
    ].forEach((inputValue) => {
        it("returns `false` otherwise", () => {
            const expectedValue = false;

            const actualValue = implementsStack(inputValue);
            expect(actualValue).to.equal(expectedValue);
        });
    })
})