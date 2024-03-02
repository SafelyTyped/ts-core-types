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

import type { NodeJSModuleName } from "../../SupportingTypes/NodeJSModuleName/NodeJSModuleName";
import type { ExtraData } from "../ExtraData/ExtraData";
import type { NoExtraData } from "../ExtraData/NoExtraData";

/**
 * `StructuredProblemReportData` defines a databag. It holds all of the
 * structured data for an error that has occurred at runtime.
 *
 * It defines the the structure that you pass into
 * {@link makeStructuredProblemReport} when you create problem reports in
 * the constructor of your {@link AppError}.
 *
 * @public
 * @typeParam E -
 * This is the type that describes your error's per-instance data
 * (the unique data about the error that has occurred).
 */
export interface StructuredProblemReportData<E extends ExtraData | NoExtraData> {
    /**
     * `.definedBy` tells us which module defined the corresponding
     *  {@link AppError} class.
     */
    readonly definedBy: NodeJSModuleName;

    /**
     * `.description` contains a summary of went wrong.
     *
     * NOTE: `description` is not a printf() format string. It will have the
     * exact same value for each and every occurance of the error.
     */
    readonly description: string;

    /**
     * `.errorId` contains a unique reference for this error.
     *
     * If present, it may be used to build a URI that is shared with the
     * end-user.
     */
    readonly errorId?: string;

    /**
     * `.extra` contains any unique data for this error occurance.
     */
    readonly extra: E;
}