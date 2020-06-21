// tslint:disable: max-classes-per-file
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
import { implementsToPrimitive } from "./implementsToPrimitive";
import { RefinedNumber, RefinedString } from "../../RefinedTypes";
import { ValueObject } from "../..";

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

class UnitTestValueObject<T> extends ValueObject<T> {
    public constructor(input: T) {
        super(input);
    }
}

describe("implementsToPrimitive()", () => {
    describe("objects that have [Symbol.toPrimitive]", () => {
        [
            new UnitTestRefinedNumber(100),
            new UnitTestRefinedString("hello world!"),
        ].forEach((inputValue) => {
            it("returns `true` for " + inputValue.constructor.name, () => {
                expect(implementsToPrimitive(inputValue)).to.equal(true);
            });

        });
    });

    describe("objects that don't have [Symbol.toPrimitive]", () => {
        [
            { },
            new UnitTestValueObject(100),
            new UnitTestValueObject("hello world!"),
        ].forEach((inputValue) => {
            it("returns `false` for " + inputValue.constructor.name, () => {
                expect(implementsToPrimitive(inputValue)).to.equal(false);
            });
        });
    });

    describe("non-objects", () => {
        [
            null,
            undefined,
            true,
            false,
            0,
            0.1,
            "hello world!"
        ].forEach((inputValue) => {
            it("returns `false` for " + JSON.stringify(inputValue), () => {
                expect(implementsToPrimitive(inputValue)).to.equal(false);
            });
        });
    });
});