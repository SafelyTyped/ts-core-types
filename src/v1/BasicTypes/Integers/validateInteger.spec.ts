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

import { DEFAULT_DATA_PATH, UnsupportedTypeError, validateInteger } from "../../";

describe("validateInteger()", () => {
    [
        -100,
        0,
        100
    ].forEach((inputValue) => {
        it("returns `input` when given a integer", () => {
            const expectedValue = inputValue;

            const actualValue = validateInteger(DEFAULT_DATA_PATH, inputValue);
            expect(actualValue).to.eql(expectedValue);
        });
    });

    it("returns an `AppError` for non-integer numbers", () => {
        [
            3.1415927,
            -100.50,
        ].forEach((val) => {
            const expectedValue = new UnsupportedTypeError({
                public: {
                    dataPath: DEFAULT_DATA_PATH,
                    expected: "number (with an integer value)",
                    actual: "number (with a non-integer value)",
                }
            })
            const actualValue = validateInteger(DEFAULT_DATA_PATH, val);
            expect(actualValue).to.be.instanceOf(UnsupportedTypeError);
            if (actualValue instanceof UnsupportedTypeError) {
                expect(actualValue.details).to.eql(expectedValue.details, "failed on " + val);
            }
        })
    })

    it("returns an `AppError` otherwise", () => {
        [
            null,
            [ 1, 2, 3, 4, 5 ],
            true,
            false,
            {
                foo: "bar"
            },
            "111",
        ].forEach((val) => {
            const expectedValue = new UnsupportedTypeError({
                public: {
                    dataPath: DEFAULT_DATA_PATH,
                    expected: "number",
                    actual: typeof val,
                }
            })
            const actualValue = validateInteger(DEFAULT_DATA_PATH, val);
            expect(actualValue).to.be.instanceOf(UnsupportedTypeError);
            if (actualValue instanceof UnsupportedTypeError) {
                expect(actualValue.details).to.eql(expectedValue.details, "failed on " + val);
            }
        })
    })
});