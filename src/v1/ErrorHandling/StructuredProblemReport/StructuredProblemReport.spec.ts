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

import { MODULE_NAME, NoExtraData, StructuredProblemReport, StructuredProblemReportData, makeStructuredProblemReport } from "../../";
import { UnitTestFailureData } from "../../_fixtures";

describe("StructuredProblemReport", () => {
    describe(".constructor()", () => {
        it("creates a new StructuredProblemReport", () => {
            const inputValue: StructuredProblemReportData<UnitTestFailureData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: {
                    public: {
                        field1: "first field",
                    },
                    logsOnly: {
                        field2: "second field",
                    },
                }
            };

            const unit = new StructuredProblemReport(inputValue);

            expect(unit).to.be.instanceOf(StructuredProblemReport);
        });

        it("accepts input data that has no `extra` data", () => {
            const inputValue: StructuredProblemReportData<NoExtraData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: undefined,
            };

            const unit = new StructuredProblemReport(inputValue);

            expect(unit).to.be.instanceOf(StructuredProblemReport);
        });
    });

    describe(".definedBy", () => {
        it("returns the `definedBy` field from the underlying input data", () => {
            const inputValue: StructuredProblemReportData<UnitTestFailureData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: {
                    public: {
                        field1: "first field",
                    },
                    logsOnly: {
                        field2: "second field",
                    },
                }
            };
            const expectedValue = inputValue.definedBy;

            const unit = makeStructuredProblemReport(inputValue);
            const actualValue = unit.definedBy;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".errorId", () => {
        it("returns the `errorId` field from the underlying input data", () => {
            const inputValue: StructuredProblemReportData<UnitTestFailureData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                errorId: "this is our error ID",
                extra: {
                    public: {
                        field1: "first field",
                    },
                    logsOnly: {
                        field2: "second field",
                    },
                }
            };
            const expectedValue = inputValue.errorId;

            const unit = makeStructuredProblemReport(inputValue);
            const actualValue = unit.errorId;

            expect(actualValue).to.equal(expectedValue);
        });

        it("returns `undefined` if there is no `errorId` field in the input data", () => {
            const inputValue: StructuredProblemReportData<UnitTestFailureData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: {
                    public: {
                        field1: "first field",
                    },
                    logsOnly: {
                        field2: "second field",
                    },
                }
            };
            const expectedValue = undefined;

            const unit = makeStructuredProblemReport(inputValue);
            const actualValue = unit.errorId;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".extra", () => {
        it("returns the extra data, for errors that have any", () => {
            const inputValue: StructuredProblemReportData<UnitTestFailureData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: {
                    public: {
                        field1: "first field",
                    },
                    logsOnly: {
                        field2: "second field",
                    },
                }
            };
            const expectedValue = inputValue.extra;

            const unit = makeStructuredProblemReport(inputValue);
            const actualValue = unit.extra;

            expect(actualValue).to.eql(expectedValue);
        });

        it("returns `undefined`, for errors that have no extra data", () => {
            const expectedValue = undefined;

            const inputValue: StructuredProblemReportData<NoExtraData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: undefined,
            };

            const unit = makeStructuredProblemReport(inputValue);
            const actualValue = unit.extra;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe("protocols", () => {
        it("implements Value", () => {
            const inputValue: StructuredProblemReportData<UnitTestFailureData> = {
                definedBy: MODULE_NAME,
                description: "this is a test",
                extra: {
                    public: {
                        field1: "first field",
                    },
                    logsOnly: {
                        field2: "second field",
                    },
                }
            };

            const unit = makeStructuredProblemReport(inputValue);

            expect(typeof unit.implementsValue).to.equal("function");
            expect(unit.implementsValue()).to.equal(true);
        });
    })
});