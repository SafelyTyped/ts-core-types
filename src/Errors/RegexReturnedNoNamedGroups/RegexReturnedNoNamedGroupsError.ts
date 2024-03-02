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
import { AppError } from "../../ErrorHandling/AppError/AppError";
import type { AppErrorData } from "../../ErrorHandling/AppError/AppErrorData";
import { makeStructuredProblemReport } from "../../ErrorHandling/StructuredProblemReport/makeStructuredProblemReport";
import { MODULE_NAME } from "../defaults/MODULE_NAME";
import type { RegexReturnedNoNamedGroupsData } from "./RegexReturnedNoNamedGroupsData";

/**
 * `RegexReturnedNoNamedGroupsError` is a throwable Error. It is thrown
 * whenever we `exec()` a `RegExp` and get back a `RegExpExecArray` with
 * an empty `.groups` property.
 *
 * @public
 */
export class RegexReturnedNoNamedGroupsError extends AppError<RegexReturnedNoNamedGroupsData> {
    public constructor(params: RegexReturnedNoNamedGroupsData & AppErrorData) {
        const spr = makeStructuredProblemReport<RegexReturnedNoNamedGroupsData>({
            definedBy: MODULE_NAME,
            description: "regex returned empty groups property",
            errorId: params.errorId,
            extra: {
                logsOnly: params.logsOnly
            },
        });

        super(spr);
    }
}