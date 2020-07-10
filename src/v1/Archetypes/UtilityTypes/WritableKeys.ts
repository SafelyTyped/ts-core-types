//
// The following code was taken from Stack Overflow, and is licensed
// under the CC-BY-SA 4.0 license.
//
// See https://stackoverflow.com/a/52473108 for the code
// See https://stackoverflow.com/posts/52473108/timeline for the license
// confirmation
//
// Written by Matt McCutchen https://github.com/mattmccutchen
//

import { IfEquals } from "./IfEquals";

export type WritableKeys<T> = {
    [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];
