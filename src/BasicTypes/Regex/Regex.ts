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

import type { DataPath } from "../../ErrorHandling/DataPath/DataPath";
import { DEFAULT_DATA_PATH } from "../../ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
import type { OnError } from "../../ErrorHandling/OnError/OnError";
import { THROW_THE_ERROR } from "../../ErrorHandling/OnError/defaults/THROW_THE_ERROR";
import { RegexReturnedNoResultsError } from "../../Errors/RegexReturnedNoResults/RegexReturnedNoResultsError";
import { regexMustCompile } from "./regexMustCompile";

/**
 * `Regex` is a safe type. It's a `RegExp` that throws errors so
 * that you don't have to do checks all the time.
 *
 * @public
 */
export class Regex extends RegExp {
    /**
     * `constructor()` creates a new regular expression class.
     *
     * If the regular expression does not compile, a
     * {@link RegexDoesNotCompileError}  is thrown.
     */
    public constructor(
        exp: string,
        {
            path = DEFAULT_DATA_PATH,
            onError = THROW_THE_ERROR,
            flags = undefined,
        }: {
            path?: DataPath,
            onError?: OnError,
            flags?: string,
        } = {}
    ) {
        // robustness!
        regexMustCompile(exp, flags, { onError, path });

        // at this point, we're confident that the regex will work
        super(exp, flags);
    }

    /**
     * `execOrThrow()` applies this regex to the given `input`.
     *
     * If the regex does not match, a {@link RegexReturnedNoResultsError}
     * is thrown, so that you don't have to check for `null`.
     *
     * @param input -
     * @returns
     */
    public exec(input: string): RegExpExecArray {
        const retval = super.exec(input);

        // robustness!
        if (retval === null) {
            throw new RegexReturnedNoResultsError({
                logsOnly: {
                    dataPath: DEFAULT_DATA_PATH,
                    regex: this.source,
                }
            });
        }

        return retval;
    }
}