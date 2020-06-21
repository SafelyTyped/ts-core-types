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

import { addExtension } from "../Extensions";
import { makeProtocolDefinition } from "./makeProtocolDefinition";
import { implementsProtocol } from "../Protocol";
import { getPublicMethodNames } from "../../BasicTypes";
import { ExtensionDefinesNoMethodsError } from "../../Errors";

interface ExampleValue {
    valueOf(): string;
}

interface GuessMediaType {
    guessMediaType(): string;
}

interface UnitTestGuessMediaType extends ExampleValue, GuessMediaType { }
class UnitTestGuessMediaType {
    public guessMediaType() {
        return this.valueOf();
    }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestExample {
    public constructor(private value: string) {}

    public valueOf() { return this.value; }
}

// tslint:disable-next-line: max-classes-per-file
class EmptyDataBag {

}

const ObjectMethods = getPublicMethodNames(Object.prototype);

describe("makeProtocolDefinition()", () => {
    it("can use the implementation's prototype", () => {
        const expectedValue = [
            ...ObjectMethods,
            "guessMediaType"
        ].sort();
        const actualValue = makeProtocolDefinition(UnitTestGuessMediaType.prototype).sort();

        expect(actualValue).to.eql(expectedValue);
    });

    it("can be used with implementsProtocol()", () => {
        const unit = addExtension(
            new UnitTestExample("text/html"),
            UnitTestGuessMediaType.prototype,
        );

        const GuessMediaTypeProtocol = makeProtocolDefinition(UnitTestGuessMediaType.prototype);

        const actualValue = implementsProtocol<GuessMediaType>(unit, GuessMediaTypeProtocol);
        expect(actualValue).to.equal(true);
    });

    it("throws an AppError if given an Extension that defines no methods", () => {
        // yes, it's contrived, but the TypeScript compiler
        // and code coverage shows that it's a possible scenario
        const unit = new EmptyDataBag();
        Object.setPrototypeOf(Object.getPrototypeOf(unit), null);
        expect(() => makeProtocolDefinition(unit)).to.throw(ExtensionDefinesNoMethodsError);
    });

    it("throws an AppError if given an Extension that has no constructor", () => {
        // yes, it's contrived, but the TypeScript compiler
        // and code coverage shows that it's a possible scenario
        const unit = {};
        Object.setPrototypeOf(unit, null);
        expect(() => makeProtocolDefinition(unit)).to.throw(ExtensionDefinesNoMethodsError);
    });
});