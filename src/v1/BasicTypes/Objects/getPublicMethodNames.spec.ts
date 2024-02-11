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

import { getPublicMethodNames } from "@safelytyped/core-types";

class UnitTestBaseClass {
    public fn1(): string {
        return "hello world";
    }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestChildClass extends UnitTestBaseClass {
    public fn1(): string {
        return "hello there!";
    }

    public fn2(): string {
        return "this is a test";
    }

    public fn3 = (x: string) => x;
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestExample extends UnitTestChildClass {
    public attr1: string = "";
    public get attr2(): string {
        return "hello world";
    }
    public set attr3(x: string) {
        // do nothing
    }

    public fn2(): string {
        return "hello world";
    }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestGetterExample {
    public get attr2(): string {
        return "hello world";
    }
}

const ObjectMethods = [
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
];

describe("getPublicMethodNames()", () => {
    it("returns all the methods in an object", () => {
        const expectedValue = [
            ...ObjectMethods,
            "fn1",
        ].sort();

        const unit = new UnitTestBaseClass();
        const actualValue = getPublicMethodNames(unit).sort();
        expect(actualValue).to.eql(expectedValue);
    });

    it("returns all the inherited methods in an object too", () => {
        const expectedValue = [
            ...ObjectMethods,
            "fn1",
            "fn2",
            "fn3",
        ].sort();

        const unit = new UnitTestExample();
        const actualValue = getPublicMethodNames(unit).sort();
        expect(actualValue).to.eql(expectedValue);
    });

    it("does not treat getters as methods", () => {
        const expectedValue = [
            ...ObjectMethods,
        ].sort();

        const unit = new UnitTestGetterExample();
        const actualValue = getPublicMethodNames(unit).sort();
        expect(actualValue).to.eql(expectedValue);
    });

    it("returns an empty list for objects with no prototype", () => {
        const expectedValue: string[] = [];

        const unit = {};
        Object.setPrototypeOf(unit, null);

        const actualValue = getPublicMethodNames(unit).sort();
        expect(actualValue).to.eql(expectedValue);
    });
});