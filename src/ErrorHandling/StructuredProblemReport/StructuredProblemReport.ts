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
import { ValueObject } from "../../Archetypes/Values/ValueObject/ValueObject";
import type { NodeJSModuleName } from "../../SupportingTypes/NodeJSModuleName/NodeJSModuleName";
import type { AnyExtraData } from "../ExtraData/AnyExtraData";
import type { StructuredProblemReportData } from "./StructuredProblemReportData";

/**
 * `StructuredProblemReport` is a value object. It represents a problem
 * (a logic or robustness error) that has been reported in the code.
 *
 * Create a `StructuredProblemReport` class for each of your {@link AppError}
 * classes.
 *
 * @public
 * @typeParam E -
 * This is the type that describes your error's per-instance data
 * (the unique data about the error that has occurred).
 */
export class StructuredProblemReport<E extends AnyExtraData>
    extends ValueObject<StructuredProblemReportData<E>> {

    /**
     * `Constructor` creates a new `StructuredProblemReport`.
     *
     * @param input -
     * The data that makes up this specific problem report.
     */
    public constructor(input: StructuredProblemReportData<E>) {
        super(input);
    }

    /**
     * `.definedBy` contains the name of the module that defined this
     * `StructuredProblemReport` class.
     */
    get definedBy(): NodeJSModuleName {
        return this._value.definedBy;
    }

    /**
     * `.description` is a human-readable description of what the problem is.
     *
     * NOTE: `description` is not a printf() format string. It will have the
     * exact same value for each and every instance of the same reported
     * problem.
     */
    get description(): string {
        return this._value.description;
    }

    /**
     * `.errorId` is the unique ID of this error instance.
     *
     * It's originally passed into the constructor as an optional field
     * - so it may not have been given a value.
     *
     * If present, may be used to build a URI that is shared with the
     * end-user.
     */
    get errorId(): string | undefined {
        return this._value.errorId ?? undefined;
    }

    /**
     * `.extra` contains any per-instance / per-occurrance information
     * about what happened.
     *
     * NOTE: some errors will not have any extra information available.
     */
    get extra(): E {
        return this._value.extra;
    }
}
