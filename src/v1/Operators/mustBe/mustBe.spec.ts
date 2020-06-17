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

import { isObject } from "../../BasicTypes";
import { AnyAppError, OnError } from "../../ErrorHandling";
import { UnreachableCodeError, UnsupportedTypeError } from "../../Errors";
import { DEFAULT_DATA_PATH } from "../../SupportingTypes";
import { mustBe } from "./mustBe";

describe("mustBe()", () => {
    it("if the input is an AppError, it throws that error", () => {
        const inputValue = new UnsupportedTypeError({
            public: {
                dataPath: DEFAULT_DATA_PATH,
                expected: "any",
                actual: "unknown"
            }
        });
        expect(() => mustBe(inputValue)).to.throw(UnsupportedTypeError);
    });

    it("if the input is an Error, it throws that error", () => {
        const inputValue = new TypeError("this is a test");
        expect(() => mustBe(inputValue)).to.throw(TypeError);
    });

    it("returns a MustBePipelineStep otherwise", () => {
        const inputValue = "hello";
        const actualValue = mustBe(inputValue);

        expect(isObject(actualValue)).to.equal(true);
        expect(typeof actualValue.next).to.equal("function");
        expect(typeof actualValue.value).to.equal("function");
    });

    it("uses the supplied onError handler", () => {
        const myError: OnError = (e: AnyAppError): never => {
            throw new Error("myOnError called!");
        };

        const unit = () => {
            mustBe("hello", { onError: myError })
            .next((x) => 100)
            .next((x) => new UnreachableCodeError({
                public: {
                    reason: "this is a test"
                },
            }))
            .value();
        };

        expect(unit).to.throw("myOnError called!");
    });
});