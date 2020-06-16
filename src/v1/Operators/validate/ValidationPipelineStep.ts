// MIT License
//
// Copyright (c) 2018 Joshua Harms
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// Based on code originally from: https://github.com/nozzlegear/railway
//
// We (Ganbaro Digital) have modified it to short-circuit if the value
// has become an Error.

import { AppErrorOr } from "../../OptionTypes";

/**
 * `ValidationPipelineStep` describes the structure of a wrapper around
 * a {@link TypeValidator} function.
 *
 * @category Operators
 */
export interface ValidationPipelineStep<T> {
    /**
     * `.value()` returns the current value of this pipeline step.
     *
     * Use this to get a result from the end of the pipeline.
     */
    readonly value: () => AppErrorOr<T>;

    /**
     * `.next()` defines the next step of the pipeline.
     *
     * @param fn
     * the next {@link TypeValidator} function to call
     */
    next<R>(fn: (x: T) => AppErrorOr<R>): ValidationPipelineStep<R>;
}

