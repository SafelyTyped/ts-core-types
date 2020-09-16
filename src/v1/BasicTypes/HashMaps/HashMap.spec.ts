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
});