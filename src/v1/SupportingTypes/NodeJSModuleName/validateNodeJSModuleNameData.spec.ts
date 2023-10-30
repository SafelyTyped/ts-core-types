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

import { AppError, DEFAULT_DATA_PATH, validateNodeJSModuleNameData } from "../../";

describe("validateNodeJSModuleNameData()", () => {
    describe("it validates non-scoped NPM package names", () => {
        [
            "core-types",
        ].forEach((inputValue) => {
            it("returns `input` for non-scoped NPM package name " + inputValue, () => {
                const actualValue = validateNodeJSModuleNameData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(inputValue);
            });
        });
    });

    describe("it validates scoped NPM package names", () => {
        [
            "@safelytyped/core-types",
        ].forEach((inputValue) => {
            it("returns `input` for scoped NPM package name " + inputValue, () => {
                const actualValue = validateNodeJSModuleNameData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(inputValue);
            });
        });
    });

    describe("it does not require a component after the package name", () => {
        [
            "@safelytyped/core-types",
        ].forEach((inputValue) => {
            it("returns `input` for NPM package name " + inputValue, () => {
                const actualValue = validateNodeJSModuleNameData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(inputValue);
            });
        });
    });

    describe("it supports sub-package names", () => {
        [
            "@safelytyped/core-types/v1",
            "@safelytyped/core-types/v1/folder",
        ].forEach((inputValue) => {
            it("returns `input` for NPM package name " + inputValue, () => {
                const actualValue = validateNodeJSModuleNameData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(inputValue);
            });
        });
    });

    describe("it allows uppercase letters in sub-package names", () => {
        [
            "@safelytyped/core-types/V1",
            "@safelytyped/core-types/v1/FOLDER",
        ].forEach((inputValue) => {
            it("returns `input` for NPM package name " + inputValue, () => {
                const actualValue = validateNodeJSModuleNameData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.equal(inputValue);
            });
        });
    });

    describe("it rejects invalid module names", () => {
        [
            "",
            "safelytyped/@core-types",
            "@SAFELYTYPED/core-types",
            "@safelytyped/@CORE-TYPES",
        ].forEach((inputValue) => {
            it("returns an `AppError` for " + inputValue, () => {
                const actualValue = validateNodeJSModuleNameData(DEFAULT_DATA_PATH, inputValue);
                expect(actualValue).to.be.instanceOf(AppError);
            });
        });
    });
});