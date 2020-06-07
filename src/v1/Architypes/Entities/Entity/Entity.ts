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

/**
 * Entity describes the behaviour of data that has an identity.
 *
 * It is useful for ensuring all entities have a *minimal* set
 * of common behaviour, whether or not they share a common base class.
 *
 * Use {@link Value} for data that does not have an identity.
 *
 * @category Architypes
 * @template ID the type of the entity's ID property
 * @template T the type of the wrapped data
 */
export interface Entity<ID, T> {
    /**
     * idOf() returns this entity's identity.
     *
     * This is normally one (or more) fields from `T`.
     *
     * @returns the entity's ID
     */
    idOf(): ID;

    /**
     * isEntity() is a helper function for the `isEntity()` type guard
     * function.
     *
     * @returns `true` every time.
     */
    isEntity(): boolean;

    /**
     * valueOf() returns the wrapped value.
     *
     * For types passed by reference, we do NOT return a clone of any kind.
     * You have to be careful not to accidentally change this value.
     *
     * @returns the wrapped value.
     */
    valueOf(): T;
}
