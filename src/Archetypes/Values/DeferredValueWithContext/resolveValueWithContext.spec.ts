//
// Copyright (c) 2024-present Ganbaro Digital Ltd
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
import { resolveValueWithContext } from "./resolveValueWithContext";
import { expect } from "chai";

type ResolverContext = {
    expectedValue: string;
}
type ResolverOpts = {
    optValue: string;
}

describe("resolveValueWithContext()", () => {
    it("returns the value when given a value", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this simple test proves that resolveValueWithContext() works when
        // our input is a value (and not a function)

        // ----------------------------------------------------------------
        // setup your test

        const expectedValue = "hello world";
        const inputValue = expectedValue;

        const context: ResolverContext = {
            expectedValue
        };
        const opts: ResolverOpts = {
            optValue: "unused",
        }

        // ----------------------------------------------------------------
        // perform the change

        const actualValue = resolveValueWithContext(context, inputValue, opts);

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).to.eql(expectedValue);
    });

    it("returns the value when given a function", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this simple test proves that resolveValueWithContext() works when
        // our input is a resolver function of some kind

        // ----------------------------------------------------------------
        // setup your test

        const expectedValue = "hello world";
        const inputFn = (context: ResolverContext, opts: ResolverOpts) => expectedValue;

        const context: ResolverContext = {
            expectedValue
        };
        const opts: ResolverOpts = {
            optValue: "unused",
        }

        // ----------------------------------------------------------------
        // perform the change

        const actualValue = resolveValueWithContext(context, inputFn, opts);

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).to.eql(expectedValue);
    });

    it("passes the given context into the resolver function", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this simple test proves that resolveValueWithContext() passes
        // the `context` parameter into our resolver function

        // ----------------------------------------------------------------
        // setup your test

        const expectedValue = "hello world";
        const inputFn = (context: ResolverContext, opts: ResolverOpts) => context.expectedValue;

        const context: ResolverContext = {
            expectedValue
        };
        const opts: ResolverOpts = {
            optValue: "unused",
        }

        // ----------------------------------------------------------------
        // perform the change

        const actualValue = resolveValueWithContext(context, inputFn, opts);

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).to.eql(expectedValue);
    });

    it("passes the given options into the resolver function", () => {
        // ----------------------------------------------------------------
        // explain your test

        // this simple test proves that resolveValueWithContext() passes
        // the `opts` parameter into our resolver function

        // ----------------------------------------------------------------
        // setup your test

        const expectedValue = "hello world";
        const inputFn = (context: ResolverContext, opts: ResolverOpts) => opts.optValue;

        const context: ResolverContext = {
            expectedValue: "unused",
        };
        const opts: ResolverOpts = {
            optValue: expectedValue,
        }

        // ----------------------------------------------------------------
        // perform the change

        const actualValue = resolveValueWithContext(context, inputFn, opts);

        // ----------------------------------------------------------------
        // test the results

        expect(actualValue).to.eql(expectedValue);
    });
});