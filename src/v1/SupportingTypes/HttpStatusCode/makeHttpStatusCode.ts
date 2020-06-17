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
import {
    HttpStatusCode,
    MAKE_HTTP_STATUS_CODE_DEFAULT_OPTIONS,
    MakeHttpStatusCodeOptions,
    mustBeHttpStatusCodeData,
} from ".";
import { FunctionalOption, makeNominalType, SmartConstructor } from "../../Archetypes";

/**
 * `makeHttpStatusCode()` is a smart constructor. It turns a `number` type
 * into a {@link HttpStatusCode} type.
 *
 * Internally, it calls {@link mustBeHttpStatusCodeData} to validate `number`.
 *
 * @category HttpStatusCode
 * @param input
 * the number to convert into a `HttpStatusCode` type
 * @param options
 * the user-supplied options
 * @param fnOpts
 * user-supplied functional options
 * @returns
 * the HttpStatusCode
 */
export const makeHttpStatusCode: SmartConstructor<number, HttpStatusCode, MakeHttpStatusCodeOptions, number|HttpStatusCode>
    = (
        input: number,
        options: MakeHttpStatusCodeOptions = MAKE_HTTP_STATUS_CODE_DEFAULT_OPTIONS,
        ...fnOpts: FunctionalOption<number|HttpStatusCode>[]
    ): HttpStatusCode => makeNominalType<number, HttpStatusCode, MakeHttpStatusCodeOptions>(
        mustBeHttpStatusCodeData,
        input,
        options,
        ...fnOpts
    );
