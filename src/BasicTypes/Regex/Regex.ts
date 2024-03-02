//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public
// License along with this program. If not, see
// <https://www.gnu.org/licenses/>.
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