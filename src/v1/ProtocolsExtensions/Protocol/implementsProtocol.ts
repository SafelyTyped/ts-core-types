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
import { DataPath, DEFAULT_DATA_PATH } from "../../SupportingTypes";
import { ProtocolDefinition } from "../ProtocolDefinition";
import { validateImplementsProtocol } from "./validateImplementsProtocol";

/**
 * `implementsProtocol()` is a type guard. Use it to prove that `target`
 * probably implements the Extension described by `protocol`.
 *
 * We check:
 * - that the methods listed in `protocol` exist on `target`
 *
 * We do not check:
 * - that the methods have the right type signatures
 * - for Symbols
 *
 * @param target -
 * The object to inspect
 * @param protocol -
 * The list of methods that `target` must implement
 * @param path -
 * Where are we in the data structure that you are inspecting?
 * @returns
 * - `true` if `target` can be used as type `T`
 * - `false` otherwise
 * @typeParam T -
 * The interface that defines the protocol. You need to provide this value,
 * to keep the Typescript compiler happy.
 *
 * @public
 */
export function implementsProtocol<T>(
    target: object & ({} | T),
    protocol: ProtocolDefinition,
    {
        path = DEFAULT_DATA_PATH
    }: {
        path?: DataPath
    } = {}
): target is T {
    return !(validateImplementsProtocol(path, target, protocol) instanceof Error);
}