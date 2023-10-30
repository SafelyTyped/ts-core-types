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
import { RegexReturnedNoNamedGroupsError } from "../../Errors";
import type { AppErrorOr } from "../../OptionTypes";
import type { DataPath } from "../../SupportingTypes";
import type { RegExpExecArrayWithGroups } from "./RegExpExecArrayWithGroups";
import { isObject } from "../Objects";

/**
 * `validateRegExpExecArrayWithGroups()` is a data validator. Use it to
 * prove that your `RegExpExecArray` definitely has a `groups`
 * field.
 *
 * @param regex -
 * the regex that your `RegExpExecArray` came from
 * @param path -
 * where you are in the data structure that you are validating
 * @param input -
 * the data structure to validate
 * @returns
 * - `input` if it has a `groups` field
 * - a `RegexReturnedNoNamedGroupsError` otherwise
 *
 * @public
 */
export function validateRegExpExecArrayWithGroups
(
    regex: RegExp,
    path: DataPath,
    input: RegExpMatchArray
): AppErrorOr<RegExpExecArrayWithGroups>
{
    if (!isObject(input.groups)) {
        return new RegexReturnedNoNamedGroupsError({
            logsOnly: {
                dataPath: path,
                regex: regex.source,
            }
        });
    }

    return input as RegExpExecArrayWithGroups;
}