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

import { Regex, RegexDoesNotCompileError, RegexReturnedNoResultsError } from "@safelytyped/core-types";

describe("Regex", () => {
    it("is a RegExp", () => {
        const unit = new Regex(".*");
        expect(unit).is.instanceOf(RegExp);
    });

    describe(".constructor()", () => {
        it("returns a RegExp on success", () => {
            const inputValue = "abc";
            const unit = new Regex(inputValue);

            expect(unit).to.be.instanceOf(RegExp);
            expect(unit.source).to.equal(inputValue);
        });

        it("throws a RegexDoesNotCompileError if the regex does not compile", () => {
            expect(() => new Regex("(invalid")).to.throw(RegexDoesNotCompileError);
        });
    });

    describe(".exec()", () => {
        it("returns a RegExpExecArray on success", () => {
            const unit = new Regex("b");
            const inputValue = "abc";

            // RegExpExecArray is a bit of a mess ...
            const expectedResult = new RegExp("b").exec("abc");
            expect(typeof expectedResult === null).to.equal(false);

            const actualResult = unit.exec(inputValue);
            expect(actualResult).to.eql(expectedResult);
        });

        it("throws a RegexReturnedNoResultsError if the regex did not match", () => {
            const unit = new Regex("abc");
            expect(() => unit.exec("xyz")).to.throw(RegexReturnedNoResultsError);
        });
    });
});