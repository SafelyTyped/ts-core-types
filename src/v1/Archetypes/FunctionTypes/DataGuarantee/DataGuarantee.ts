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
import { DataGuaranteeOptions } from "./DataGuaranteeOptions";

/**
 * A `DataGuarantee` inspects the given data, to see if the given data
 * meets a defined contract / specification.
 *
 * If the given data does meet the given contract / specification, the
 * DataGuarantee returns the given data.
 *
 * If the given data does not meet the given contract / specification,
 * the DataGuarantee calls the supplied {@link OnError} handler. The
 * {@link OnError} handler must throw an {@link AppError} of some kind.
 *
 * `T` is the type of data to be inspected
 *
 * When you implement a DataGuarantee, make it a wrapper around one or more
 * {@link TypeGuard}s and/or {@link DataGuard}s - and even other
 * DataGuarantees if appropriate. It's the best way to make your code
 * as reusable as possible.
 *
 * @template T
 * The acceptable data type to inspect.
 * @param input
 * The data to guarantee.
 * @param onError
 * We call this if `input` fails the inspection.
 * @param path
 * This is where we are in the data structure that you are inspecting.
 */
export type DataGuarantee<T = unknown, OPT extends object = object>
  = (input: T, options?: Partial<DataGuaranteeOptions> & Partial<OPT>) => void;
