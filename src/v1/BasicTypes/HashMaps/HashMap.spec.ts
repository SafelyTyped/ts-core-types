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
import { resolveNumerical } from "../../OptionTypes";

import { HashMap } from "./HashMap";

type BuildIndexTestValue = {
    aliases: string[];
    contents: string;
}

describe("HashMap()", () => {
    it("can be used as a type for anonymous data", () => {
        // if this compiles, the test passes
        const unit: HashMap<string> = {
            test1: "passes"
        };

        // a dummy test, to make sure the test counts
        expect(unit.test1).to.equal("passes");
    });

    it("can store values", () => {
        const unit: HashMap<string> = {
            test1: "passes"
        };

        expect(unit.test1).to.equal("passes");
    });

    it("can store functions", () => {
        const unit: HashMap<()=>number> = {
            test1: () => 1,
        };

        const expectedResult = [ "test1" ];

        const actualResult = HashMap.keys(unit);
        expect(expectedResult).to.eql(actualResult);
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

    describe(".keys()", () => {
        it("returns a list of the keys in the HashMap", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = [ "attr1", "attr2", "attr3" ];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.keys(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it("returns an empty list if the HashMap is empty", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {};

            const expectedResult: string[] = [];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.keys(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".values()", () => {
        it("returns a list of the values in the HashMap", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = [
                "this is attr1",
                "this is attr2",
                "this is attr3"
            ];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.values(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it("returns an empty list if the HashMap is empty", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {};

            const expectedResult: string[] = [];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.values(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".has()", () => {
        it("returns true if the property exists", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = true;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.has(unit, "attr2");

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it("returns false if the property does not exist", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = false;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.has(unit, "attr4");

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".get()", () => {
        it("returns the property's value, if the property exists", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = unit.attr2;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.get(unit, "attr2");

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it("returns undefined if the property does not exist", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = undefined;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.get(unit, "attr4");

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".clear()", () => {
        it("empties the given HashMap", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = 0;

            // ----------------------------------------------------------------
            // perform the change

            HashMap.clear(unit);
            const actualResult = HashMap.size(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".delete()", () => {
        it("removes the given property", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = true;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.delete(unit, "attr2");

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
            expect(HashMap.size(unit)).eql(2);
            expect(unit.attr2).eql(undefined);
        });

        it("returns false if the given property does not exist", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = false;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.delete(unit, "attr4");

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
            expect(HashMap.size(unit)).eql(3);
        });
    });

    describe(".size()", () => {
        it ("returns the number of keys in the given HashMap", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = 3;

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.size(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".map()", () => {
        it ("calls the given callbackfn exactly once for each property", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = {
                attr1: 1,
                attr2: 1,
                attr3: 1,
            };

            // ----------------------------------------------------------------
            // perform the change

            const actualResult: HashMap<number> = {
                attr1: 0,
                attr2: 0,
                attr3: 0,
            }
            HashMap.map(unit, (value, key) => {
                actualResult[key]++;
            })

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it ("returns a new object", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3",
                attr4: "this is not unit",
            };

            // ----------------------------------------------------------------
            // perform the change

            // this will build a new object that is identical to `unit`
            const actualResult = HashMap.map(unit, (value) => {
                return value;
            });

            // now, we need to modify `actualResult` to prove that it
            // is different to `unit`
            actualResult.attr4 = "this is not unit";

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
            expect(actualResult).not.eql(unit);
        });

        it ("the callbackfn can change the type of each value", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string|boolean> = {
                attr1: "100",
                attr2: true,
                attr3: false,
            }

            const expectedResult: HashMap<number> = {
                attr1: 100,
                attr2: 1,
                attr3: 0,
            };

            // ----------------------------------------------------------------
            // perform the change

            // this will build a new object where the values have changed
            // from a mixture to numbers
            const actualResult = HashMap.map(unit, (value) => {
                return resolveNumerical(value);
            });

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".mapToArray()", () => {
        it ("calls the given callbackfn exactly once for each property", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult = {
                attr1: 1,
                attr2: 1,
                attr3: 1,
            };

            // ----------------------------------------------------------------
            // perform the change

            const actualResult: HashMap<number> = {
                attr1: 0,
                attr2: 0,
                attr3: 0,
            }
            HashMap.mapToArray(unit, (value, key) => {
                actualResult[key]++;
            })

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it ("returns an array", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult: string[] = [
                "this is attr1",
                "this is attr2",
                "this is attr3",
            ];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.mapToArray(unit, (value) => {
                return value;
            });

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it ("the callbackfn can change the type of each value", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string|boolean> = {
                attr1: "100",
                attr2: true,
                attr3: false,
            }

            const expectedResult: number[] = [
                100,
                1,
                0,
            ];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.mapToArray(unit, (value) => {
                return resolveNumerical(value);
            });

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".getKeyValuePairs()", () => {
        it ("returns an array of key/value pairs", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult: string[] = [
                "attr1=this is attr1",
                "attr2=this is attr2",
                "attr3=this is attr3",
            ];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.getKeyValuePairs(unit);

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });

        it ("accepts a different separator", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            }

            const expectedResult: string[] = [
                "attr1: this is attr1",
                "attr2: this is attr2",
                "attr3: this is attr3",
            ];

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.getKeyValuePairs(unit, ': ');

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".find()", () => {
        it("iterates over the given HashMap", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = Object.values(unit);

            const actualResult: string[] = []

            HashMap.find(unit, (value) => {
                actualResult.push(value);
                return false;
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns the value of whichever property satisfies the callback function", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = "this is attr2";

            const actualResult = HashMap.find(unit, (value, name) => {
                return name === "attr2";
            });

            expect(actualResult).to.eql(expectedResult);
        });

        it("returns undefined if no value satisfies the callback function", () => {
            const unit: HashMap<string> = {
                attr1: "this is attr1",
                attr2: "this is attr2",
                attr3: "this is attr3"
            };
            const expectedResult = undefined;

            const actualResult = HashMap.find(unit, (value) => {
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
            HashMap.find(unit, (value, name) => {
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

            HashMap.find(unit, (value, name, obj) => {
                expect(obj).to.equal(unit);

                return false;
            });
        });
    });

    describe(".buildIndex()", () => {
        it ("returns the new index", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<BuildIndexTestValue> = {
                "help": {
                    aliases: [ "--help", "-?"],
                    contents: "this is the help option",
                },
                "verbose": {
                    aliases: [ "-v", "--verbose" ],
                    contents: "this is the verbose option",
                },
            }

            const expectedResult: HashMap<BuildIndexTestValue> = {
                "--help": unit.help,
                "-?": unit.help,
                "-v": unit.verbose,
                "--verbose": unit.verbose,
            }

            // ----------------------------------------------------------------
            // perform the change

            const actualResult = HashMap.buildIndex(
                unit,
                (value) => value.aliases
            );

            // ----------------------------------------------------------------
            // test the results

            expect(actualResult).eql(expectedResult);
        });
    });

    describe(".updateIndex()", () => {
        it ("updates the existing index", () => {
            // ----------------------------------------------------------------
            // setup your test

            const unit: HashMap<BuildIndexTestValue> = {
                "help": {
                    aliases: [ "--help", "-?"],
                    contents: "this is the help option",
                },
                "verbose": {
                    aliases: [ "-v", "--verbose" ],
                    contents: "this is the verbose option",
                },
            }

            const inputValue: HashMap<BuildIndexTestValue> = {
                "--namespace": {
                    aliases: [ "--namespace" ],
                    contents: "this is the namespace option",
                },
            }

            const expectedResult: HashMap<BuildIndexTestValue> = {
                "--namespace": inputValue['--namespace'],
                "--help": unit.help,
                "-?": unit.help,
                "-v": unit.verbose,
                "--verbose": unit.verbose,
            }

            // ----------------------------------------------------------------
            // perform the change

            HashMap.updateIndex(
                unit,
                inputValue,
                (value) => value.aliases
            );

            // ----------------------------------------------------------------
            // test the results

            expect(inputValue).eql(expectedResult);
        });
    });
});