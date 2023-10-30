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

import { DEFAULT_DATA_PATH, NumberOutOfRangeError, validateNumberRange } from "../../";

class UnitTestExample extends NumberOutOfRangeError {
    public unique: string = "hello there!";
}

describe("validateNumberRange()", () => {
    describe("when the input value is in-range", () => {
        [
            [ 0, 0, 0 ],
            [ 80, 0, 65535 ],
            [ 0, -100, 100 ],
        ].forEach((example) => {
            const [ inputValue, minInc, maxInc ] = example;

            it("returns " + inputValue + " with range " + minInc + "-" + maxInc + " inclusive", () => {
                const actualValue = validateNumberRange(
                    DEFAULT_DATA_PATH,
                    inputValue,
                    minInc,
                    maxInc
                );

                expect(actualValue).to.equal(inputValue);
            });
        });
    });

    describe("when the input value is out of range", () => {
        it("returns an AppError if the input is too small", () => {
            const inputValue = 100;
            const actualValue = validateNumberRange(
                DEFAULT_DATA_PATH,
                inputValue,
                200,
                300
            );

            expect(actualValue).to.be.instanceOf(NumberOutOfRangeError);
        });

        it("returns an AppError if the input is too large", () => {
            const inputValue = 100;
            const actualValue = validateNumberRange(
                DEFAULT_DATA_PATH,
                inputValue,
                0,
                10
            );

            expect(actualValue).to.be.instanceOf(NumberOutOfRangeError);
        });
    });

    describe("user-supplied options", () => {
        it("allows the caller to set the returned AppError", () => {
            const inputValue = 100;
            const actualValue = validateNumberRange(
                DEFAULT_DATA_PATH,
                inputValue,
                0,
                10,
                { rangeError: UnitTestExample }
            );

            expect(actualValue).to.be.instanceOf(UnitTestExample);
            if (actualValue instanceof UnitTestExample) {
                expect(actualValue.unique).to.equal("hello there!");
            } else {
                // this will catch any surprises
                expect(false).to.equal(true);
            }
        });
    })
});