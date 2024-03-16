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
    type OnErrorOptions,
    RefinedString,
    THROW_THE_ERROR,
    ValueObject,
    DEFAULT_DATA_PATH,
    type DataGuaranteeOptions,
    type Branded
} from "@safelytyped/core-types";
import { NeverABrandedUuidError } from "../../_fixtures/NeverABrandedUuid/NeverABrandedUuidError";

type _Uuid = Branded<string, 'unit-tests/uuid'>;

function mustBeUuid(
    input: string,
    {
        path = DEFAULT_DATA_PATH,
        onError = THROW_THE_ERROR
    }: DataGuaranteeOptions = {}
): _Uuid {
    return input as _Uuid;
}

function neverAUuid(input: string, { onError = THROW_THE_ERROR }: OnErrorOptions = {}): never {
    throw onError(new NeverABrandedUuidError());
}

function defaultOnErrorHandler(e: AnyAppError): never {
    throw new Error("DEFAULT ERROR HANDLER CALLED");
}

class Uuid extends RefinedString {
    public static from(input: string): Uuid {
        return new Uuid(mustBeUuid, input, { onError: defaultOnErrorHandler });
    }
}

// tslint:disable-next-line: max-classes-per-file
class NeverUuid extends RefinedString {
    public static from(input: string): NeverUuid {
        return new NeverUuid(neverAUuid, input, { onError: defaultOnErrorHandler });
    }
}

describe("RefinedString", () => {
    it("is a value object", () => {
        const inputValue = "123e4567-e89b-12d3-a456-426655440000";
        const actualValue = Uuid.from(inputValue);

        expect(actualValue).to.be.instanceOf(ValueObject);
        expect(actualValue.valueOf()).to.equal(inputValue);
        expect(actualValue.implementsValue()).to.equal(true);
    });

    it("calls the error handler when the guarantee fails", () => {
        const inputValue = "123e4567-e89b-12d3-a456-426655440000";
        expect(() => {NeverUuid.from(inputValue); }).to.throw("DEFAULT ERROR HANDLER CALLED");
    });

    it("auto-converts to a string", () => {
        const inputValue = "123e4567-e89b-12d3-a456-426655440000";
        const uuid = Uuid.from(inputValue);
        const expectedValue = "this is a uuid: " + inputValue;

        const actualValue = "this is a uuid: " + uuid;
        expect(actualValue).to.equal(expectedValue);
    });

    it("does not auto-convert to a number", () => {
        const inputValue = "hello world!"
        const uuid = Uuid.from(inputValue);

        const actualValue = uuid[Symbol.toPrimitive]("number");
        // tslint:disable-next-line: no-unused-expression
        expect(actualValue).to.be.NaN;
    });
});
