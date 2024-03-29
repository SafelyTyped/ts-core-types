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

import { ObjectHasMissingMethodsError, validateObjectHasAllMethodsCalled } from "@safelytyped/core-types";

class UnitTestBaseClass {
    public fn1(): string {
        return "hello world";
    }
}

class UnitTestChildClass extends UnitTestBaseClass {
    public fn1(): string {
        return "hello there!";
    }

    public fn2(): string {
        return "this is a test";
    }

    public fn3 = (x: string) => x;
}

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

class UnitTestGetterExample {
    public get attr2(): string {
        return "hello world";
    }
}

describe("validateObjectHasAllMethodsCalled()", () => {
    it("validates methods in a base class", () => {
        const unit = new UnitTestBaseClass();

        const actualValue = validateObjectHasAllMethodsCalled(
            [ "fn1" ],
            unit,
        );
        expect(actualValue).to.equal(unit);
    });

    it("validates methods inherited from a base class", () => {
        const unit = new UnitTestExample();

        const actualValue = validateObjectHasAllMethodsCalled(
            [ "fn1" ],
            unit,
        );
        expect(actualValue).to.equal(unit);
    });

    it("validates methods defined as arrow functions", () => {
        const unit = new UnitTestExample();

        const actualValue = validateObjectHasAllMethodsCalled(
            [ "fn3" ],
            unit,
        );
        expect(actualValue).to.equal(unit);
    });

    it("does not treat getters as methods", () => {
        const unit = new UnitTestGetterExample();

        const actualValue = validateObjectHasAllMethodsCalled(
            [ "attr2" ],
            unit,
        );

        expect(actualValue).to.be.instanceOf(ObjectHasMissingMethodsError);
        if (actualValue instanceof ObjectHasMissingMethodsError) {
            expect(actualValue.details.extra.public.missingMethods).to.eql(["attr2"]);
        }
    });

    it("returns an AppError if any methods are missing", () => {
        const unit = new UnitTestExample();

        const actualValue = validateObjectHasAllMethodsCalled(
            [ "fn1", "DOES_NOT_EXIST" ],
            unit,
        );

        expect(actualValue).to.be.instanceOf(ObjectHasMissingMethodsError);
        if (actualValue instanceof ObjectHasMissingMethodsError) {
            expect(actualValue.details.extra.public.missingMethods).to.eql(["DOES_NOT_EXIST"]);
        }
    });
});