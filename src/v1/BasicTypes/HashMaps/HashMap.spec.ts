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

import { HashMap } from "./HashMap";


describe("HashMap()", () => {
    it("can be used as a type for anonymous data", () => {
        // if this compiles, the test passes
        const unit: HashMap<string> = {
            test1: "passes"
        };

        // a dummy test, to make sure the test counts
        expect(unit.test1).to.equal("passes");
    });

    describe(".forEach()", () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = Object.values(unit);

            const actualResult: string[] = [];
            HashMap.forEach(unit, (value) => {
                actualResult.push(value);
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the attribute's name as the callback's second parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            let actualResult = true;
            HashMap.forEach(unit, (value, name) => {
                if (unit[name] !== value) {
                    actualResult = false;
                }
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the target object as the callback's third parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };

            HashMap.forEach(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);
            });
        });
    });

    describe('.filter()', () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult: HashMap<string> = {
                attr2: unit.attr2,
            }

            const actualResult= HashMap.filter(unit, (value) => {
                return value.includes("attr2");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns an empty HashMap if no values pass the filter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult: HashMap<string> = { }

            const actualResult= HashMap.filter(unit, (value) => {
                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the attribute's name as the callback's second parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            let actualResult = true;
            HashMap.filter(unit, (value, name) => {
                if (unit[name] !== value) {
                    actualResult = false;
                }

                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the target object as the callback's third parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };

            HashMap.filter(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);

                return false;
            });
        });
    });

    describe('.some()', () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = Object.values(unit);

            const actualResult: string[] = []

            HashMap.some(unit, (value) => {
                actualResult.push(value);
                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns true if at least one value pass the filter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            const actualResult= HashMap.some(unit, (value) => {
                return value.includes("attr2");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns false if no values pass the filter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = false;

            const actualResult= HashMap.some(unit, (value) => {
                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the attribute's name as the callback's second parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            let actualResult = true;
            HashMap.some(unit, (value, name) => {
                if (unit[name] !== value) {
                    actualResult = false;
                }

                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the target object as the callback's third parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };

            HashMap.some(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);

                return false;
            });
        });
    });

    describe('.every()', () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = Object.values(unit);

            const actualResult: string[] = []

            HashMap.every(unit, (value) => {
                actualResult.push(value);
                return true;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns true if all values pass the filter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            const actualResult = HashMap.every(unit, (value) => {
                return value.includes("this");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns false if any value does not pass the filter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = false;

            const actualResult = HashMap.every(unit, (value) => {
                return value.includes("attr3");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the attribute's name as the callback's second parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            let actualResult = true;
            HashMap.every(unit, (value, name) => {
                if (unit[name] !== value) {
                    actualResult = false;
                }

                return true;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the target object as the callback's third parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };

            HashMap.every(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);

                return true;
            });
        });
    });

    describe(".first()", () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = Object.values(unit);

            const actualResult: string[] = []

            HashMap.first(unit, (value) => {
                actualResult.push(value);
                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns whichever value satisfies the callback function", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = {
                attr2: unit.attr2,
            };

            const actualResult = HashMap.first(unit, (value) => {
                return value.includes("attr2");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns an empty HashMap if no value satisfies the callback function", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = {};

            const actualResult = HashMap.first(unit, (value) => {
                return value.includes("attr4");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the attribute's name as the callback's second parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            let actualResult = true;
            HashMap.first(unit, (value, name) => {
                if (unit[name] !== value) {
                    actualResult = false;
                }

                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the target object as the callback's third parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };

            HashMap.first(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);

                return false;
            });
        });
    });

    describe(".firstKey()", () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = Object.values(unit);

            const actualResult: string[] = []

            HashMap.firstKey(unit, (value) => {
                actualResult.push(value);
                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns the name of whichever property satisfies the callback function", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = "attr2";

            const actualResult = HashMap.firstKey(unit, (value) => {
                return value.includes("attr2");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns null if no value satisfies the callback function", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = null;

            const actualResult = HashMap.firstKey(unit, (value) => {
                return value.includes("attr4");
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the attribute's name as the callback's second parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = true;

            let actualResult = true;
            HashMap.firstKey(unit, (value, name) => {
                if (unit[name] !== value) {
                    actualResult = false;
                }

                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("passes the target object as the callback's third parameter", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };

            HashMap.firstKey(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);

                return false;
            });
        });
    });
});