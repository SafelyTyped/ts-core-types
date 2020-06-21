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
import { AnyHashMap, STOP_AT_NEXT_PROTOTYPE, STOP_AT_OBJECT_PROTOTYPE } from "../../BasicTypes";
import { findAttributes, findMethods } from "../../BasicTypes/Objects";

/**
 * `addExtension()` is a object transformer. It turns `target` into an
 * instance of the intersection type, by adding `source`'s methods to
 * the `target`.
 *
 * NOTE: this function modifies the input `target`.
 *
 * @param target
 * This is the object that you want to add the extension to.
 * @param source
 * This is the extension that you want to add to `target`.
 * @param seed
 * If you need to copy any attributes over to `target`, pass them in here.
 * @returns
 * The modified `target`, type-cast to be both `Target` and `Source` types.
 *
 * @template Target
 * The type of object that `target` is. The compiler normally works this
 * out for you.
 * @template Source
 * The type of object that `source` is. The compiler normally works this
 * out for you.
 *
 * @category ProtocolsExtensions
 */
export function addExtension<Target extends object, Source extends object>(
    target: Target,
    source: Source,
    {
        seed,
    }: {
        seed?: object
    } = {}
): Target & Source {
    // get these done first
    addSourceMethods(target, source);

    // do we have any data to copy over as well?
    addSeedValues(target, seed);

    // all done
    return target as Target & Source;
}

function addSourceMethods(target: object, source: object) {
    // add all of source's methods to target
    for (const [ propName, propDesc ] of findMethods(
        source,
        { nextPrototype: STOP_AT_OBJECT_PROTOTYPE },
        // don't overwrite methods that already exist
        (x) => typeof (target as AnyHashMap)[ x.propName ] !== "function"
    )) {
        Object.defineProperty(target, propName, propDesc);
    };
}

function addSeedValues(target: object, seed: object | undefined) {
    if (!seed) {
        return;
    }

    for (const [ propName, propDesc ] of findAttributes(
        seed,
        { nextPrototype: STOP_AT_NEXT_PROTOTYPE }
    )) {
        Object.defineProperty(target, propName, propDesc);
    }
}