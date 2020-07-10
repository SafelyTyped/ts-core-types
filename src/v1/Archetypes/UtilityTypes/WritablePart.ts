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

import { WritableKeys } from "./WritableKeys";

export type WritablePart<T> = Pick<T, WritableKeys<T>>;
