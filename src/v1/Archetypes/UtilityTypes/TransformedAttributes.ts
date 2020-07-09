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
import { AttributeTransformers } from "./AttributeTransformers";


/**
 * `TransformedAttributes` is a mapped type. It contains a list of fields
 * taken from `T`, and the type of these fields after the transformers
 * in `AT` have been applied.
 *
 * ie, given:
 * - two types `S` (source type) and `T` (target type),
 * - and a set of {@link AttributeTransformers} `AT<S>` to convert `S`
 *   into `T`,
 * it creates a type that contains the fields of 'T' that 'AT' produces.
 *
 * Most importantly, it does it without you having to provide 'T' as a
 * type parameter.
 *
 * @template S
 * the type that the {@link AttributeTransformers} are applied to
 * @template AT
 * the list of fields to be created, and the functions that do the
 * creating
 *
 * @category UtilityTypes
 */
export type TransformedAttributes<S extends object, AT extends AttributeTransformers<S>> = {
    [K in keyof AT]: K extends keyof S ?
        AT[K] extends (...args: any[]) => infer R ? R : void
        : never
}