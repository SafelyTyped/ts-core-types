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
import { DataPath } from ".";
import { FunctionalOption, makeNominalType } from "../../Archetypes";
import { OnErrorOptions, THROW_THE_ERROR } from "../../ErrorHandling";
import { mustBeDataPathData } from "./mustBeDataPathData";

/**
 * `makeDataPath()` is a {@link SmartConstructor}. Use it to turn a string
 * into a {@link DataPath}.
 *
 * @category DataPath
 *
 * @param input
 * the value you want to convert to a {@link DataPath}
 * @param onError
 * we call this error handler if `input` fails validation
 * @param fnOpts
 * user-supplied functional options to manipulate the path once it has
 * been created
 */
export const makeDataPath = (
    input: string,
    { onError = THROW_THE_ERROR }: OnErrorOptions = {},
    ...fnOpts: FunctionalOption<string|DataPath>[]
) => makeNominalType<string, DataPath, OnErrorOptions>(
    mustBeDataPathData,
    input,
    { onError },
    ...fnOpts
)