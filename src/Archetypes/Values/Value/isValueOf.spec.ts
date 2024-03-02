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

import { isValueOf, validateString, ValueObject } from "@safelytyped/core-types"

class GoodExampleValue extends ValueObject<string> {
    public static from(input: string): GoodExampleValue {
        return new GoodExampleValue(input);
    }
}

class BadExampleValue extends ValueObject<number> {
    public static from(input: number): BadExampleValue {
        return new BadExampleValue(input);
    }
}

describe("isValueOf()", () => {
    it("returns `true` if the input is a value that wraps the expected type", () => {
        const inputValue = "123e4567-e89b-12d3-a456-426655440000";
        const expectedValue = true;

        const unit = GoodExampleValue.from(inputValue);
        const actualValue = isValueOf(validateString, unit);

        expect(actualValue).to.equal(expectedValue);
    });

    it("returns `false` otherwise", () => {
        const inputValue = 1000;
        const expectedValue = false;

        const unit = BadExampleValue.from(inputValue);
        const actualValue = isValueOf(validateString, unit);

        expect(actualValue).to.equal(expectedValue);
    });

    it("is a type predicate", () => {
        const inputValue = "123e4567-e89b-12d3-a456-426655440000";
        const expectedValue = inputValue;

        const unit = GoodExampleValue.from(inputValue);
        let actualValue = "FAILED!!!";
        if (isValueOf(validateString, unit)) {
            // this does not compile if isValue() is not a type-predicate!
            actualValue = unit.valueOf();
        }

        expect(actualValue).to.equal(expectedValue);
    });

});