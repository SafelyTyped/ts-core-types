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
import { isHttpStatusCodeData } from ".";
import { OnErrorOptions, THROW_THE_ERROR } from "../../ErrorHandling";
import { HttpStatusCodeOutOfRangeError } from "../../Errors/HttpStatusCodeOutOfRange";
import { NotAnIntegerError } from "../../Errors/NotAnInteger";

/**
 * `mustBeHttpStatusCodeData` is a data guarantee. It ensures that `input` is
 * a valid HTTP status code.
 *
 * @category HttpStatusCode
 * @param input
 * the number to validate
 */
export function mustBeHttpStatusCodeData(
    input: number,
    { onError = THROW_THE_ERROR }: OnErrorOptions = {}
): void {
    // make sure that `input` is an integer
    //
    // if anyone passes in a massive number, this will report a false
    // error ... but the performance increase that comes from the bitshift
    // operation is more than worth it
    // tslint:disable-next-line: no-bitwise
    if (input >>> 0 !== input) {
        throw onError(new NotAnIntegerError({public: {input}}));
    }

    if (!isHttpStatusCodeData(input)) {
        throw onError(new HttpStatusCodeOutOfRangeError({public: {input}}));
    }

    // if we get here, all is good
}