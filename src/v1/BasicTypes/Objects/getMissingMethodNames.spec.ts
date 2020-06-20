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

import { getMissingMethodNames } from "./getMissingMethodNames";


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

describe("getMissingMethodNames()", () => {
    it("works with methods in a base class", () => {
        const unit = new UnitTestBaseClass();

        const actualValue = getMissingMethodNames(
            unit,
            [ "fn1" ]
        );
        expect(actualValue).to.eql([]);
    });

    it("withs with methods inherited from a base class", () => {
        const unit = new UnitTestExample();

        const actualValue = getMissingMethodNames(
            unit,
            [ "fn1" ]
        );
        expect(actualValue).to.eql([]);
    });

    it("works with methods defined as arrow functions", () => {
        const unit = new UnitTestExample();

        const actualValue = getMissingMethodNames(
            unit,
            [ "fn3" ]
        );
        expect(actualValue).to.eql([]);
    });

    it("does not treat getters as methods", () => {
        const unit = new UnitTestGetterExample();

        const actualValue = getMissingMethodNames(
            unit,
            [ "attr2" ]
        );

        expect(actualValue).to.eql([ "attr2" ]);
    });

    it("returns a list of missing methods", () => {
        const unit = new UnitTestExample();

        const actualValue = getMissingMethodNames(
            unit,
            [ "fn1", "DOES_NOT_EXIST" ],
        );

        expect(actualValue).to.eql([ "DOES_NOT_EXIST" ]);
    });
});