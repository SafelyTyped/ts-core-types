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

import { ValidationPipelineStep } from "./ValidationPipelineStep";
import { AppErrorOr } from "../../OptionTypes";
import { AppError } from "../../ErrorHandling";

/**
 * `validate()` executes a series of functions, one after the next.
 * The return type of one function becomes the input type of the next.
 *
 * Note that all of these functions are executed at the moment that your
 * code calls `validate()`. Wrap it in an arrow function if you want to make
 * reusable pipes.
 *
 * If any of the functions called by a pipeline step returns an `Error`,
 * we stop calling the remaining functions in the pipeline, and return that
 * `Error` as the ultimate value.
 *
 * @category Operators
 * @param val
 * This is the initial value to feed into your pipeline.
 * @returns
 * Returns a pipeline step, which you can add to (by calling .next()) or
 * you can terminate (by calling .value()).
 */
export function validate<T>(
    val: AppErrorOr<T>
): ValidationPipelineStep<T> {
    // no reason to continue
    if (val instanceof AppError) {
        return validate<T>(val);
    }

    return {
        next: (fn) => validate(fn(val)),
        value: () => val
    };
}