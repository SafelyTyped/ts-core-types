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

/**
 * `extractStackFromCaught()` is a helper method. Use it to get the stack
 * trace from a value caught by a `catch()` statement, if it has one!
 *
 * LIMITATIONS:
 * - we cannot detect if `input.stack` is a well-formatted stack trace
 *
 * @category ErrorHandling
 * @param input
 * the value to try and get a stack trace from
 * @returns
 * - the stack trace (if available) (does NOT include the error name
 *   and error message that normally live on the first line)
 * - an empty string otherwise
 */
export function extractStackFromCaught(input: unknown): string {
    // do we have a stack?
    if (!implementsStack(input)) {
        return "";
    }

    // strip off the error name and message
    //
    // if `stack` isn't a strack trace, there's not much we
    // can do about it
    return input.stack.substring(input.stack.indexOf("\n") + 1);
}

interface Stack {
    stack: string;
}

function implementsStack(input: unknown): input is Stack {
    if (!(input instanceof Object)) {
        return false;
    }

    return (typeof (input as any).stack === "string");
}