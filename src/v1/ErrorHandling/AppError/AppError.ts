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
import { AnyExtraData } from "../ExtraData";
import { StructuredProblemReport } from "../StructuredProblemReport";

/**
 * `AppError` is a base class for throwable Javascript Errors.
 *
 * It includes structured information about the error that is being
 * reported. This information is designed to support your app's
 * logging approach.
 *
 * When dumped to console() or equivalent, the object's name includes
 * the module where the Error was defined. This makes it easier to write
 * documentation for production systems.
 *
 * @category ErrorHandling
 * @template E
 * This is the extra data that this class of error will store.
 */
export class AppError<E extends AnyExtraData> extends Error {
    /**
     * `details` is a full description of what happened
     */
    public readonly details: StructuredProblemReport<E>;

    /**
     * `Constructor` builds a new `AppError` instance.
     */
    protected constructor(details: StructuredProblemReport<E>) {
        // set the Error message
        super(details.description);

        // stash our StructuredProblemReport
        this.details = details;

        // make it clear where this error came from,
        // if anyone dumps it to console.log()
        this.name = this.details.definedBy + "/" + this.constructor.name;
    }
}