//
// The following code is taken from GitHub, and is believed to be
// in the public domain.
//
// Written by https://github.com/mattmccutchen
// See https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
//

/**
 * `IfEquals` is a utility type. It evaluates to:
 *
 * - `A` if `X` and `Y` are equivalent types, and
 * - `B` otherwise
 *
 * @see https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 *
 * @public
 */
export type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;
