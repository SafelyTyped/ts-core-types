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

import { Definitely } from "./Definitely";
import { IdenticallyNamedKeys } from "./IdenticallyNamedKeys";

/**
 * `AttributeTransformerMap` is a mapped type. Use it to build an interface
 * that describes how to transform fields in type `S` to their equivalent
 * in type `T`.
 *
 * The returned mapped type will only contain fields that exist on both
 * `S` and `T`.
 *
 * All the fields in the returned mapped type will be optional.
 *
 * Each function takes one parameter: the value of the field in the `S`
 * (source) type. The function must return a type that's compatible with
 * the type of the field in type `T`.
 *
 * @template S
 * The source data type.
 * @template T
 * The target data type.
 *
 * @category UtilityTypes
 */
export type AttributeTransformerMap<S extends object, T extends object> = {
    [K in IdenticallyNamedKeys<S,T>]?: K extends keyof T? (input: Definitely<S[K]>) => T[K] : never
};