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

import { DEFAULT_DATA_PATH, UnsupportedStringLengthRangeError, validateStringLengthBetween } from "@safelytyped/core-types";

describe("validateStringLength()", () => {
    it("returns `input` when the input validates", () => {
        const inputValue = "hello";
        const expectedValue = inputValue;

        const actualValue = validateStringLengthBetween(
            0, 10,
            DEFAULT_DATA_PATH,
            inputValue
        );
        expect(actualValue).to.eql(expectedValue);
    });

    it("treats `maxLength == -1` as infinite length", () => {
        const inputValue = "hello";
        const expectedValue = inputValue;

        const actualValue = validateStringLengthBetween(
            2, -1,
            DEFAULT_DATA_PATH,
            inputValue
        );
        expect(actualValue).to.eql(expectedValue);
    });

    it("returns an `AppError` when the input is too short", () => {
        const inputValue = "goodbye!";
        const expectedValue = new UnsupportedStringLengthRangeError({
            public: {
                dataPath: DEFAULT_DATA_PATH,
                minLength: 10,
                maxLength: 100,
                actualLength: 8,
            }
        })
        const actualValue = validateStringLengthBetween(
            10, 100,
            DEFAULT_DATA_PATH,
            inputValue
        );
        expect(actualValue).to.be.instanceOf(UnsupportedStringLengthRangeError);
        if (actualValue instanceof UnsupportedStringLengthRangeError) {
            expect(actualValue.details).to.eql(expectedValue.details, "failed on " + inputValue);
        }
    });

    it("returns an `AppError` when the input is too long", () => {
        const inputValue = "goodbye!";
        const expectedValue = new UnsupportedStringLengthRangeError({
            public: {
                dataPath: DEFAULT_DATA_PATH,
                minLength: 0,
                maxLength: 5,
                actualLength: 8,
            }
        })
        const actualValue = validateStringLengthBetween(
            0, 5,
            DEFAULT_DATA_PATH,
            inputValue
        );
        expect(actualValue).to.be.instanceOf(UnsupportedStringLengthRangeError);
        if (actualValue instanceof UnsupportedStringLengthRangeError) {
            expect(actualValue.details).to.eql(expectedValue.details, "failed on " + inputValue);
        }
    });
});