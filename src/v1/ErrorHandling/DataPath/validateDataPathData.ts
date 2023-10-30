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
import type { AppErrorOr } from "../../ErrorHandling";
import { validateStringStartsWith } from "../../BasicTypes";
import { recast, validate } from "../../Operators";
import type { DataPath } from "./DataPath";

/**
 * `validateDataPathData()` is a {@link DataValidator}. Use it to prove that
 * the `input` string is a valid {@link DataPath}.
 *
 * @param path -
 * Where are we in the data structure? A .dot.notation.path.
 * @param input -
 * The value to validate.
 * @returns
 * - `input`, recast as a {@link DataPath}
 * - or an {@link AppError} explaining why validation failed
 *
 * @public
 */
export function validateDataPathData(path: DataPath, input: string): AppErrorOr<DataPath> {
    return validate(input)
        .next((x) => validateStringStartsWith(".", path, x))
        .next((x) => recast<string, AppErrorOr<DataPath>>(x))
        .value();
}