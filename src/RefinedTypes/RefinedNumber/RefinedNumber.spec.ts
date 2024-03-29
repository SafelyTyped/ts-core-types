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
    type AnyAppError,
    type FunctionalOption,
    type OnErrorOptions,
    RefinedNumber,
    THROW_THE_ERROR,
    ValueObject,
    applyFunctionalOptions,
    DEFAULT_DATA_PATH,
    type DataGuaranteeOptions
} from "@safelytyped/core-types";
import { NeverAdultAgeError } from "../../_fixtures/NeverAdultAge/NeverAdultAgeError";

function mustBeAdultAge(
    input: number,
    {
        path = DEFAULT_DATA_PATH,
        onError = THROW_THE_ERROR
    }: DataGuaranteeOptions = {}
): number {
    return input;
}

function neverAdultAge(input: number, { onError = THROW_THE_ERROR }: OnErrorOptions = {}): never {
    throw onError(new NeverAdultAgeError({public: { input }}));
}

function defaultOnErrorHandler(e: AnyAppError): never {
    throw new Error("DEFAULT ERROR HANDLER CALLED");
}

export const makeAdultAge = (
    input: number,
    { onError = THROW_THE_ERROR }: OnErrorOptions = {},
    ...fnOpts: FunctionalOption<AdultAge>[]
) => applyFunctionalOptions(
    new AdultAge(input, { onError }),
    { onError },
    ...fnOpts
);

class AdultAge extends RefinedNumber {
    public constructor(input: number, options: OnErrorOptions) {
        super(mustBeAdultAge, input, options);
    }
}

export const makeNeverAdultAge = (
    input: number,
    { onError = THROW_THE_ERROR }: OnErrorOptions = {},
    ...fnOpts: FunctionalOption<AdultAge>[]
) => applyFunctionalOptions(
    new NeverAdultAge(input, { onError }),
    { onError },
    ...fnOpts
);

// tslint:disable-next-line: max-classes-per-file
class NeverAdultAge extends RefinedNumber {
    public constructor(input: number, options: OnErrorOptions) {
        super(neverAdultAge, input, options);
    }
}

describe("RefinedNumber", () => {
    it("is a value object", () => {
        const inputValue = 21;
        const actualValue = makeAdultAge(inputValue);

        expect(actualValue).to.be.instanceOf(ValueObject);
        expect(actualValue.valueOf()).to.equal(inputValue);
        expect(actualValue.implementsValue()).to.equal(true);
    });

    it("calls the error handler when the guarantee fails", () => {
        const inputValue = 5;
        expect(() => {
            makeNeverAdultAge(
                inputValue,
                { onError: defaultOnErrorHandler }
            );
        }).to.throw("DEFAULT ERROR HANDLER CALLED");
    });

    it("auto-converts to a string", () => {
        const inputValue = 21;
        const age = makeAdultAge(inputValue);
        const expectedValue = "this person is " + inputValue + " years old";

        const actualValue = "this person is " + age + " years old";
        expect(actualValue).to.equal(expectedValue);

        // the test above doesn't work the way we expect, even though we
        // do get the result we want
        //
        // the underlying JavaScript engine calls `toPrimitive()` with
        // a `hint` value of `default` - NOT `string`. This is revealed
        // by looking at the code coverage metrics.
        //
        // we need to do a little more to prove that `toPrimitive()` also
        // works if it is ever called with a `string` hint

        const actualString = age[Symbol.toPrimitive]("string");
        expect(actualString).to.equal("21");
    });

    it("auto-converts to a number", () => {
        // the problem is that TypeScript currently (v3.7.x) doesn't
        // understand the [Symbol.toPrimitive] feature of standard
        // JavaScript
        //
        // as a result, the TS compiler will not compile the code
        // that triggers auto-convertion to a number - even though
        // the code works in standard Javascript :(
        //
        // for now, the best we can do is to prove that `toPrimitive()`
        // works, so that this feature is ready for whenever TypeScript
        // fixes this bug
        const inputValue = 21;
        const age = makeAdultAge(inputValue);

        const actualValue = age[Symbol.toPrimitive]("number");
        expect(actualValue).to.equal(21);
    });
});