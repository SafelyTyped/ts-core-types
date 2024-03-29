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

import { applyFunctionalOptions, type Branded } from "@safelytyped/core-types";

type Message = Branded<string, "unit-test/message">;

describe("applyFunctionalOptions()", () => {
    it("applies all of the functional options", () => {
        const inputValue = "tHiS iS A bIt AwKwArD";
        const expectedValue = "this is a";

        const actualValue = applyFunctionalOptions(
            inputValue,
            {},
            (x) => x.toLowerCase(),
            (x) => x.slice(0, 9)
        );

        expect(actualValue).to.equal(expectedValue);
    });

    it("passes the user-supplied options to the functional options", () => {
        const expectedOptions = {
            harry: "sally",
        };
        let actualOptions;

        applyFunctionalOptions(
            "dummy value",
            expectedOptions,
            (x, opts) => { actualOptions = opts; return x; },
        );

        expect(actualOptions).to.eql(expectedOptions);
    });

    it("typecasts the output", () => {
        const typeChecker = (input: Message) => input;

        const res = applyFunctionalOptions<Message>(
            "hello, world" as Message,
            {},
            (x) => x.toUpperCase() as Message
        );

        // will not compile if applyFunctionalOptions() does not do the
        // return value type casting for us
        typeChecker(res);
    });
});