//
// Assignright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above assignright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above assignright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the assignright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE ASSIGNRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// ASSIGNRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
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

import { assignOptionalFieldsUsingTransformers } from "../../";

interface UnitTestTarget {
    one?: number;
    two?: number;
    three?: number;
}

interface UnitTestSource {
    one?: string;
    two?: string;
    three?: string;
    four?: string;
}

// as of TypeScript 3.9.6, the transformers can't be lambdas,
// they have to be pre-defined functions
const str2Int = (x: string) => parseInt(x, 10);

describe("assignOptionalFieldsWithTransformers()", () => {
    it("copies listed fields from `source` to `target`", () => {
        const targetValue: UnitTestTarget = {};
        const sourceValue: UnitTestSource = {
            one: "1",
            two: "2",
            three: "3"
        };
        const expectedValue = {
            one: 1,
            two: 2,
            three: 3,
        };

        assignOptionalFieldsUsingTransformers(
            {
                one: str2Int,
                two: str2Int,
                three: str2Int,
            },
            targetValue,
            sourceValue
        );
        expect(targetValue).to.eql(expectedValue);
    });

    it("does not assign fields that are not in the `fieldsList`", () => {
        const targetValue: UnitTestTarget = {};
        const sourceValue: UnitTestSource = {
            one: "1",
            two: "2",
            three: "3"
        };
        const expectedValue = {
            one: 1,
            three: 3,
        };

        assignOptionalFieldsUsingTransformers(
            {
                one: str2Int,
                three: str2Int,
            },
            targetValue,
            sourceValue
        );
        expect(targetValue).to.eql(expectedValue);
    });

    it("does not assign fields that are `undefined`", () => {
        const targetValue: UnitTestTarget = {};
        const sourceValue: UnitTestSource = {
            one: "1",
            two: undefined,
            three: "3"
        };
        const expectedValue = {
            one: 1,
            three: 3,
        };

        assignOptionalFieldsUsingTransformers(
            {
                one: str2Int,
                two: str2Int,
                three: str2Int,
            },
            targetValue,
            sourceValue
        );
        expect(targetValue).to.eql(expectedValue);
    });

    it("accepts multiple `sources`", () => {
        const targetValue: UnitTestTarget = {};
        const sourceValue: UnitTestSource[] = [
            {
                one: "1",
                two: "2",
                three: "3"
            },
            {
                three: "33",
            }
        ];

        const expectedValue = {
            one: 1,
            two: 2,
            three: 33,
        };

        assignOptionalFieldsUsingTransformers(
            {
                one: str2Int,
                two: str2Int,
                three: str2Int,
            },
            targetValue,
            ...sourceValue
        );
        expect(targetValue).to.eql(expectedValue);
    });

});