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

import { BooleanishRules, DEFAULT_BOOLEANISH_RULES, DEFAULT_DATA_PATH, DataPath, UnsupportedBooleanishValueError, UnsupportedTypeError, implementsOwnOrInheritedToString, validateBooleanishData } from "../../../";

class UnitTestTrue {
    public toString() { return "yes"; }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestFalse {
    public toString() { return "no"; }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestNonsense {
    public toString() { return "tannoy"; }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestNonsenseChild extends UnitTestNonsense {
    public toString() { return "no "};
}

// we use this to prove that the built-in Map type
// does not get treated as booleanish data
const unitTestMap = new Map();
unitTestMap.set("hello", "world");

// we use this to prove that the built-in Set type
// does not get treated as booleanish data
const unitTestSet = new Set();
unitTestSet.add("false");

describe("validateBooleanishData()", () => {
    describe("using the default ruleset", () => {
        [
            true,
            1,
            "1",
            "true",
            "TrUE",
            "yes",
            "yES",
            "ON",
            "oN",
            "on",
            "ACK",
            "Ack",
            "ack",
            "Yarp",
            "yarp",
            new UnitTestTrue(),
        ].forEach((inputValue) => {
            it("returns `true` when given " + inputValue + " (" + typeof inputValue + ")", () => {
                const expectedValue = true;

                const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });

        [
            false,
            0,
            "0",
            "false",
            "fAlSe",
            "no",
            "nO",
            "OFF",
            "Off",
            "off",
            "NACK",
            "nack",
            "NARP",
            "narp",
            new UnitTestFalse(),
        ].forEach((inputValue) => {
            it("returns `false` when given " + inputValue + " (" + typeof inputValue + ")", () => {
                const expectedValue = false;

                const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(expectedValue);
            });
        });

        it("returns an `UnsupportedBooleanishValueError` when a number contains non-booleanish data", () => {
            [
                100,
                100.101,
            ].forEach((inputValue) => {
                const expectedValue = new UnsupportedBooleanishValueError({
                    public: {
                        dataPath: DEFAULT_DATA_PATH,
                        type: "number",
                        expected: "0 | 1",
                        actual: inputValue,
                    }
                })
                const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.be.instanceOf(UnsupportedBooleanishValueError);
                if (actualValue instanceof UnsupportedBooleanishValueError) {
                    expect(actualValue.details).to.eql(expectedValue.details, "failed on " + inputValue);
                }
            });
        });

        it("returns an `UnsupportedBooleanishValueError` when a string contains non-booleanish data", () => {
            [
                "hello world",
                new UnitTestNonsense(),
            ].forEach((inputValue) => {
                const expectedValue = new UnsupportedBooleanishValueError({
                    public: {
                        dataPath: typeof inputValue === "object" && implementsOwnOrInheritedToString(inputValue) ? "input.toString()" as DataPath : DEFAULT_DATA_PATH,
                        type: "string",
                        expected: "0 | false | no | off | nack | narp | 1 | true | yes | on | ack | yarp",
                        actual: typeof inputValue === "object" ? inputValue.toString() : inputValue,
                    }
                })
                const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.be.instanceOf(UnsupportedBooleanishValueError);
                if (actualValue instanceof UnsupportedBooleanishValueError) {
                    expect(actualValue.details).to.eql(expectedValue.details, "failed on " + inputValue);
                }
            });
        });

        it("returns an `UnsupportedTypeError` otherwise", () => {
            [
                null,
                undefined,
                [ 1, 2, 3, 4, 5, ],
                {
                    foo: "bar"
                },
                BigInt(1000),
                unitTestSet,
            ].forEach((inputValue) => {
                const expectedValue = new UnsupportedTypeError({
                    public: {
                        dataPath: DEFAULT_DATA_PATH,
                        expected: Object.keys(DEFAULT_BOOLEANISH_RULES).join(" | "),
                        actual: typeof inputValue,
                    }
                })
                const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.be.instanceOf(UnsupportedTypeError, "failed on " + inputValue);
                if (actualValue instanceof UnsupportedTypeError) {
                    expect(actualValue.details).to.eql(expectedValue.details, "failed on " + inputValue);
                }
            });
        });
    });

    describe("using custom rules", () => {
        it("supports separate rules for a named class", () => {
            const rules: BooleanishRules = {
                "UnitTestNonsense": (path, input) => {
                    return true;
                }
            }
            const inputValue = new UnitTestNonsense();
            const expectedValue = true;

            const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue, { booleanish: rules});
            expect(actualValue).to.equal(expectedValue);
        });

        it("will match a rule against a class's inheritance tree", () => {
            const rules: BooleanishRules = {
                "UnitTestNonsense": (path, input) => {
                    return true;
                }
            }
            const inputValue = new UnitTestNonsenseChild();
            const expectedValue = true;

            const actualValue = validateBooleanishData(DEFAULT_DATA_PATH, inputValue, { booleanish: rules});
            expect(actualValue).to.equal(expectedValue);
        });
    });
});