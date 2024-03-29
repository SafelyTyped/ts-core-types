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

import { type AnyFunction, type DispatchMap } from "@safelytyped/core-types";

describe("DispatchMap", () => {
    it("supports strings as keys", () => {
        // ----------------------------------------------------------------
        // setup your test


        // ----------------------------------------------------------------
        // perform the change

        // if this compiles, it works
        const unit: DispatchMap<string, AnyFunction> = {
            "a": () => 1,
            "b": () => 2,
            "c": () => 3,
        }

        // ----------------------------------------------------------------
        // test the results

        expect(unit).instanceOf(Object);
    });

    it("supports numbers as keys", () => {
        // ----------------------------------------------------------------
        // setup your test


        // ----------------------------------------------------------------
        // perform the change

        // if this compiles, it works
        const unit: DispatchMap<number, AnyFunction> = {
            1: () => 1,
            2: () => 2,
            3: () => 3,
        }

        // ----------------------------------------------------------------
        // test the results

        expect(unit).instanceOf(Object);
    });

    it("supports symbols as keys", () => {
        // ----------------------------------------------------------------
        // setup your test

        const sym1 = Symbol("sym1");
        const sym2 = Symbol("sym2");
        const sym3 = Symbol("sym3");

        // ----------------------------------------------------------------
        // perform the change

        // if this compiles, it works
        const unit: DispatchMap<symbol, AnyFunction> = {
            [sym1]: () => 1,
            [sym2]: () => 2,
            [sym3]: () => 3,
        }

        // ----------------------------------------------------------------
        // test the results

        expect(unit).instanceOf(Object);
    });
});