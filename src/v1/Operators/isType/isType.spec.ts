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
import { expect } from "chai";
import { describe } from "mocha";

import { DEFAULT_DATA_PATH } from "../../SupportingTypes";
import { isType } from "./isType";

interface UnitTestExample {
    toString: () => string;
}

describe("isType()", () => {
    it("returns `true` if the validator does not return an Error", () => {
        [
            () => { return; },
            () => null,
            () => undefined,
            () => true,
            () => false,
            () => [1, 2, 3, 4, 5],
            () => 100,
            () => { return {}; },
            () => "hello world",
        ].forEach((validator) => {
            const inputValue = "";
            const expectedValue = true;

            const actualValue = isType(validator, inputValue, { path: DEFAULT_DATA_PATH });
            expect(actualValue).to.equal(expectedValue);
        });
    });

    it("returns `false` if the validator reports an Error", () => {
        const inputValue = "";
        const expectedValue = false;

        const actualValue = isType(
            () => new TypeError("this is a test"),
            inputValue,
            { path: DEFAULT_DATA_PATH }
        );
        expect(actualValue).to.equal(expectedValue);
    });

    it("is a type guard", () => {
        const inputValue = { toString: () => "hello" } as unknown;
        const expectedValue = true;

        if (isType<UnitTestExample>(
            (path, input) => input as UnitTestExample,
            inputValue,
            { path: DEFAULT_DATA_PATH }
        )) {
            // will not compile if isType() is not a type guard
            inputValue.toString();
        }

        // dummy expect() so that the test counts
        expect(true).to.equal(expectedValue);
    });
});