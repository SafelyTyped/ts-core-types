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

import {
    RefinedNumber,
    RefinedString,
    UnsupportedNumericalValueError,
    ValueObject,
    validateNumericalData
} from "@safelytyped/core-types";

const noPrototype = {}
Object.setPrototypeOf(noPrototype, null);

class UnitTestRefinedNumber extends RefinedNumber {
    public constructor(input: number) {
        super(() => true, input, {});
    }
}

class UnitTestRefinedString extends RefinedString {
    public constructor(input: string) {
        super(() => true, input, {});
    }
}

class UnitTestToString extends ValueObject<string> {
    public constructor(input: string) {
        super(input);
    }

    public toString() {
        return this.valueOf();
    }
}

class UnitTestValueObject<T> extends ValueObject<T> {
    public constructor(input: T) {
        super(input);
    }
}

describe("validateNumericalData()", () => {
    describe("supports numbers", () => {
        [
            [ 1000000000, "1000000000" ],
            [ 1e9, "1e9" ],
            [ 0.000001, "0.000001" ],
            [ 1e-6, "1e-6" ],
            [ 0xff, "0xff" ],
            [ 0xFF, "0xFF" ],
            [ 0b11111111, "0b11111111" ],
            [ 0o377, "0o377" ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, desc ] = example;

            it("returns `input` for " + desc, () => {
                expect(validateNumericalData(inputValue)).to.equal(inputValue);
            });
        });
    });

    describe("supports strings containing integers", () => {
        [
            [ "0", 0 ],
            [ "1000000000", 1000000000 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports strings containing floating point numbers", () => {
        [
            [ "0.0", 0.0 ],
            [ "1e9", 1e9 ],
            [ "0.000001", 0.000001 ],
            [ "1e-6", 1e-6 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports strings containing binary numbers", () => {
        [
            [ "0b0", 0b0 ],
            [ "0b11111111", 0b11111111 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports strings containing hexadecimal numbers", () => {
        [
            [ "0xff", 0xff ],
            [ "0xFF", 0xFF ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports strings containing octal numbers", () => {
        [
            [ "0o0", 0 ],
            [ "0o377", 0o377 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports objects with ToPrimitive support", () => {
        [
            [ new UnitTestRefinedNumber(100), 100 ],
            [ new UnitTestRefinedString("100"), 100 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue + " (" + inputValue.constructor.name + ")", () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports objects with ToString support", () => {
        [
            [ new UnitTestToString("100"), 100 ],
            [ { toString: () => "100" }, 100 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("supports booleans", () => {
        [
            [ true, 1 ],
            [ false, 0 ],
        ].forEach((example) => {
            // shorthand
            const [ inputValue, expectedValue ] = example;

            it("returns `" + expectedValue + "` for " + inputValue, () => {
                const actualValue = validateNumericalData(inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });
    });

    describe("returns an AppError if the input is not numeric", () => {
        [
            NaN,
            new UnitTestValueObject(100),
            { msg: "this is a test" },
            noPrototype,
            "hello world!",
        ].forEach((inputValue) => {
            it("returns an AppError for " + JSON.stringify(inputValue), () => {
                const actualvalue = validateNumericalData(inputValue);
                expect(actualvalue).to.be.instanceOf(UnsupportedNumericalValueError);
            });
        });
    });
});