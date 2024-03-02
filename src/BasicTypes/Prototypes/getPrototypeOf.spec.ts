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
import { getPrototypeOf } from "@safelytyped/core-types";

describe("getPrototypeOf()", () => {
	it("returns an object when given an object", () => {
		// ----------------------------------------------------------------
		// explain your test

		// this proves that the primary use case works: that we can
		// get an object prototype from any given object

		// ----------------------------------------------------------------
		// setup your test

		const unit = {
			a: 1,
			b: 2,
			c: 3,
		};

		// ----------------------------------------------------------------
		// perform the change

		const actualValue = getPrototypeOf(unit);

		// ----------------------------------------------------------------
		// test the results

		expect(actualValue).is.a("object");
	});

	it("returns an array when given an array", () => {
		// ----------------------------------------------------------------
		// explain your test

		// in Javascript, arrays are objects too, so it's reasonable
		// for people to expect this to work!

		// ----------------------------------------------------------------
		// setup your test

		const unit = [ 1, 2, 3 ];

		// ----------------------------------------------------------------
		// perform the change

		const actualValue = getPrototypeOf(unit);

		// ----------------------------------------------------------------
		// test the results

		expect(actualValue).is.an("array");
	});

	it("returns null when given null", () => {
		// ----------------------------------------------------------------
		// explain your test

		// in Javascript, nulls are also objects, but I think it is
		// unsafe to treat them as objects here

		// ----------------------------------------------------------------
		// setup your test

		const unit = null;

		// ----------------------------------------------------------------
		// perform the change

		const actualValue = getPrototypeOf(unit);

		// ----------------------------------------------------------------
		// test the results

		expect(actualValue).is.null;
	});

	[
		undefined,
		true,
		false,
		3.1415927,
		() => {},
		100,
		0,
		-100,
		"hello world!",
	].forEach((unit) => {
		it("returns null when given a non-object", () => {
			// ----------------------------------------------------------------
			// explain your test

			// none of these things should have a prototype

			// ----------------------------------------------------------------
			// setup your test



			// ----------------------------------------------------------------
			// perform the change

			const actualValue = getPrototypeOf(unit);

			// ----------------------------------------------------------------
			// test the results

			expect(actualValue).to.be.null;
		});
	});
});