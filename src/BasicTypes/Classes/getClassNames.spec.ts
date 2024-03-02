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
import { getClassNames } from "@safelytyped/core-types";

class UnitTestClassOne {

}


class UnitTestClassTwo extends UnitTestClassOne {

}

class UnitTestClassThree extends UnitTestClassTwo {

}

describe("getClassNames()", () => {
    // this test is only possible because we force the compiler
    // to pass `null` in
    //
    // in this case, felt it was important to prove that a stray `null`
    // from somewhere wouldn't produce a runtime error or unpredictable
    // result
    it("returns [] (empty array) for `null`", () => {
        const inputValue = null;
        const expectedValue: string[] = [ ];

        const actualValue = getClassNames((inputValue as unknown) as object);
        expect(actualValue).to.eql(expectedValue);
    });

    it("returns ['Object'] for a plain object", () => {
        const inputValue = {};
        const expectedValue = [ "Object" ];

        const actualValue = getClassNames(inputValue);
        expect(actualValue).to.eql(expectedValue);
    });

    it("returns ['Array', 'Object'] for an array", () => {
        const inputValue: string[] = [];
        const expectedValue = [ "Array", "Object" ];

        const actualValue = getClassNames(inputValue);
        expect(actualValue).to.eql(expectedValue);
    });

    it("returns all classes from a class hierarchy", () => {
        const inputValue = new UnitTestClassThree();
        const expectedValue = [ "UnitTestClassThree", "UnitTestClassTwo", "UnitTestClassOne", "Object" ];

        const actualValue = getClassNames(inputValue);
        expect(actualValue).to.eql(expectedValue);
    });
});