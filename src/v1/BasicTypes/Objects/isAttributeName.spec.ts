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

import { isAttributeName } from "./isAttributeName";

class UnitTestBaseClass {
    public fn1(): string {
        return "hello world";
    }

    public attr1: string = "hello world";
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestExample extends UnitTestBaseClass {
    public attr2: string = "";
    public get attr3(): string {
        return "hello world";
    }
    public set attr4(x: string) {
        // do nothing
    }

    public fn2(): string {
        return "hello world";
    }
}

describe("isAttributeName()", () => {
    it("returns `true` for getters", () => {
        const unit = new UnitTestExample();
        const actualValue = isAttributeName(unit, "attr3");
        expect(actualValue).to.equal(true);
    });

    it("returns `false` for setters", () => {
        const unit = new UnitTestExample();
        expect(isAttributeName(unit, "attr4")).to.equal(false);
    });

    it("returns `true` for attributes", () => {
        const unit = new UnitTestExample();
        expect(isAttributeName(unit, "attr2")).to.equal(true);
    });

    it("returns `true` for inherited attributes", () => {
        const unit = new UnitTestExample();
        expect(isAttributeName(unit, "attr1")).to.equal(true);
    });

    it("returns `false` for normal methods", () => {
        const unit = new UnitTestExample();
        expect(isAttributeName(unit, "fn1")).to.equal(false);
    });

    it("returns `false` for inherited methods", () => {
        const unit = new UnitTestExample();
        expect(isAttributeName(unit, "fn1")).to.equal(false);
    });

    it("returns `false` for properties that do not exist", () => {
        const unit = new UnitTestExample();
        expect(isAttributeName(unit, "DOES_NOT_EXIST")).to.equal(false);
    });
});