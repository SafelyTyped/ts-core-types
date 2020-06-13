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
import { FunctionalOption, SmartConstructor } from "../../Archetypes";
import { makeNominalType } from "../../Archetypes";
import { THROW_THE_ERROR } from "../../ErrorHandling";
import { MakeNodeJSModuleNameOptions } from "./MakeNodeJSModuleNameOptions";
import { NodeJSModuleName } from "./NodeJSModuleName";
import { mustBeNodeJSModuleNameData } from "./mustBeNodeJSModuleNameData";

/**
 * `makeNodeJSModuleName()` is a smart constructor. It verifies that the
 * `input` string contains a valid NodeJS module name, by calling
 * {@link mustBeNodeJSModuleNameData}.
 *
 * Use {@link MAKE_NODEJS_MODULE_NAME_DEFAULT_OPTIONS} if you need to
 * pass default options in.
 *
 * @category NodeJSModuleName
 * @param input
 * This is the string that contains the module name.
 * @param onError
 * This is the error handler we call if anything goes wrong.
 * @param fnOpts
 * Any functional options you wish to use.
 * @returns
 * The validated input string, as a NodeJSModuleName type.
 */
export const makeNodeJSModuleName: SmartConstructor<string, NodeJSModuleName, MakeNodeJSModuleNameOptions, string|NodeJSModuleName> = (
    input: string,
    { onError = THROW_THE_ERROR }: MakeNodeJSModuleNameOptions = {},
    ...fnOpts: FunctionalOption<string|NodeJSModuleName>[]
): NodeJSModuleName => makeNominalType<string, NodeJSModuleName>(
    mustBeNodeJSModuleNameData,
    input,
    { onError },
    ...fnOpts
);