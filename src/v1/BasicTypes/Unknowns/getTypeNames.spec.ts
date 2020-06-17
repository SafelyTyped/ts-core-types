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

import { getTypeNames } from "./getTypeNames";

interface TestItem<T> {
    testItems: T[];
    expected: string[];
}

class UnitTestClassOne {

}


class UnitTestClassTwo extends UnitTestClassOne {

}

class UnitTestClassThree extends UnitTestClassTwo {

}

describe("getTypeNames()", () => {
    [
        {
            testItems: [null],
            expected: ["null"]
        },
        {
            testItems: [undefined],
            expected: ["undefined"],
        },
        {
            testItems: [BigInt(1000)],
            expected: ["bigint"],
        },
        {
            testItems: [true, false,],
            expected: ["boolean"],
        },
        {
            testItems: [{}],
            expected: ["Object"],
        },
        {
            testItems: [ new UnitTestClassThree()],
            expected: ["UnitTestClassThree", "UnitTestClassTwo", "UnitTestClassOne", "Object"],
        },
        {
            testItems: [0, -100, 100, 3.1415927],
            expected: ["number"]
        },
        {
            testItems: ["hello world!"],
            expected: ["string"],
        }
    ].forEach((testData: TestItem<any>) => {
        // shorthand
        const expectedValue = testData.expected;

        testData.testItems.forEach((inputValue) => {
            it("returns " + JSON.stringify(expectedValue) + " for " + inputValue, () => {
                const actualValue = getTypeNames(inputValue);
                expect(actualValue).to.eql(expectedValue);
            });
        });
    });
});