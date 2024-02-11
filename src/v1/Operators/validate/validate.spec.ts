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

import { DEFAULT_DATA_PATH, UnsupportedTypeError, isObject, validate } from "@safelytyped/core-types";

describe("validate()", () => {
    it("returns a ValidationPipelineStep", () => {
        const inputValue = "hello";
        const actualValue = validate(inputValue);

        expect(isObject(actualValue)).to.equal(true);
        expect(typeof actualValue.next).to.equal("function");
        expect(typeof actualValue.value).to.equal("function");
    });

    it("causes all the functions in the chain to execute", () => {
        let fn1Called = false;
        let fn2Called = false;
        let fn3Called = false;

        const expectedValue = "sucess!";

        const actualValue = validate("hello world!")
            .next((x) => { fn1Called = true; return 100; })
            .next((x) => { fn2Called = true; return false; })
            .next((x) => { fn3Called = true; return expectedValue;})
            .value();

        expect(fn1Called).to.equal(true);
        expect(fn2Called).to.equal(true);
        expect(fn3Called).to.equal(true);
        expect(actualValue).to.equal(expectedValue);
    });

    it("doesn't call the remaining functions once an AppError has occurred", () => {
        let fn1Called = false;
        let fn2Called = false;
        let fn3Called = false;

        const expectedValue= new UnsupportedTypeError({
            public: {
                dataPath: DEFAULT_DATA_PATH,
                expected: "something",
                actual: "nothing"
            }
        });

        const actualValue = validate("hello world!")
            .next((x) => { fn1Called = true; return expectedValue; })
            .next((x) => { fn2Called = false; return false; })
            .next((x) => { fn3Called = false; return "success";})
            .value();

        expect(fn1Called).to.equal(true);
        expect(fn2Called).to.equal(false);
        expect(fn3Called).to.equal(false);
        expect(actualValue).to.equal(expectedValue);
    });
});