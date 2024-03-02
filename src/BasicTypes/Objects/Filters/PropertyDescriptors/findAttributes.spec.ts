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

import { findAttributes } from "./findAttributes";
import { FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS } from "./defaults/FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS";

class UnitTestBaseClass {
    public attr1: string = "";

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

// tslint:disable-next-line: max-classes-per-file
class UnitTestSetterExample {
    public set attr3(x: string) {
        // do nothing
    }
}

function addToMap(m: Map<string, PropertyDescriptor>, o: object, props: string[]) {
    props.forEach((p) => {
        const prop = Object.getOwnPropertyDescriptor(o, p);
        if (!prop) {
            throw new Error("could not find property descriptor for " + p + " on " + o.constructor?.name ?? "anonymous object");
        }

        m.set(p, prop);
    });
}

function getObjectMap() {
    const retval = new Map<string, PropertyDescriptor>();
    addToMap(
        retval,
        Object.prototype,
        [
            "__proto__",
        ]
    );
    return retval;
}

describe("findAttributes()", () => {
    it("returns all the attributes in an object", () => {
        const unit = new UnitTestBaseClass();

        const expectedValue = getObjectMap();
        addToMap(expectedValue, unit, ["attr1"]);

        const actualValue = findAttributes(unit);

        // comparing Maps using chai is a bit involved
        expect(Array.from(actualValue.keys()).sort()).to.eql(Array.from(expectedValue.keys()).sort());
        expect(actualValue.size).to.eql(expectedValue.size);
        for (const key of expectedValue.keys()) {
            expect(actualValue.get(key)).to.eql(expectedValue.get(key), "result key " + key + " not the same!");
        }
    });

    it("returns all the inherited attributes in an object too", () => {
        const unit = new UnitTestExample();

        const expectedValue = getObjectMap();
        addToMap(expectedValue, UnitTestExample.prototype, ["attr2"]);
        addToMap(expectedValue, unit, ["attr1"]);

        const actualValue = findAttributes(unit);

        // comparing Maps using chai is a bit involved
        expect(Array.from(actualValue.keys()).sort()).to.eql(Array.from(expectedValue.keys()).sort());
        expect(actualValue.size).to.eql(expectedValue.size);
        for (const key of expectedValue.keys()) {
            expect(actualValue.get(key)).to.eql(expectedValue.get(key), "result key " + key + " not the same!");
        }
    });

    it("does treat getters as attributes", () => {
        const unit = new UnitTestGetterExample();

        const expectedValue = getObjectMap();
        addToMap(expectedValue, UnitTestGetterExample.prototype, ["attr2"]);

        const actualValue = findAttributes(unit);

        // comparing Maps using chai is a bit involved
        expect(Array.from(actualValue.keys()).sort()).to.eql(Array.from(expectedValue.keys()).sort());
        expect(actualValue.size).to.eql(expectedValue.size);
        for (const key of expectedValue.keys()) {
            expect(actualValue.get(key)).to.eql(expectedValue.get(key), "result key " + key + " not the same!");
        }
    });

    it("does not treat setters as attributes", () => {
        const expectedValue = getObjectMap();

        const unit = new UnitTestSetterExample();
        const actualValue = findAttributes(unit);

        // comparing Maps using chai is a bit involved
        expect(Array.from(actualValue.keys()).sort()).to.eql(Array.from(expectedValue.keys()).sort());
        expect(actualValue.size).to.eql(expectedValue.size);
        for (const key of expectedValue.keys()) {
            expect(actualValue.get(key)).to.eql(expectedValue.get(key), "result key " + key + " not the same!");
        }
    });


    it("returns an empty list for objects with no prototype", () => {
        const expectedValue = new Map();

        const unit = {};
        Object.setPrototypeOf(unit, null);

        const actualValue = findAttributes(unit);

        // comparing Maps using chai is a bit involved
        expect(Array.from(actualValue.keys()).sort()).to.eql(Array.from(expectedValue.keys()).sort());
        expect(actualValue.size).to.eql(expectedValue.size);
        for (const key of expectedValue.keys()) {
            expect(actualValue.get(key)).to.eql(expectedValue.get(key), "result key " + key + " not the same!");
        }
    });

    it("supports user-supplied filters", () => {
        const unit = new UnitTestExample();

        const expectedValue = new Map();
        addToMap(expectedValue, unit, ["attr1"]);

        const actualValue = findAttributes(
            unit,
            FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS,
            (x) => x.propName.search(/1/) > -1
        );

        // comparing Maps using chai is a bit involved
        expect(Array.from(actualValue.keys()).sort()).to.eql(Array.from(expectedValue.keys()).sort());
        expect(actualValue.size).to.eql(expectedValue.size);
        for (const key of expectedValue.keys()) {
            expect(actualValue.get(key)).to.eql(expectedValue.get(key), "result key " + key + " not the same!");
        }
    });
});

