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

// ================================================================
//
// Archetypes
//
// ----------------------------------------------------------------

// Entities
export type { Entity } from "./Archetypes/Entities/Entity/Entity";
export type { AnyEntity } from "./Archetypes/Entities/Entity/AnyEntity";
export { isEntity } from "./Archetypes/Entities/Entity/isEntity";
export { mustBeEntity } from "./Archetypes/Entities/Entity/mustBeEntity";
export { validateEntity } from "./Archetypes/Entities/Entity/validateEntity";
export { EntityObject } from "./Archetypes/Entities/EntityObject/EntityObject";
export type { AnyEntityObject } from "./Archetypes/Entities/EntityObject/AnyEntityObject";

// FunctionTypes
export type { AnyFunction } from "./Archetypes/FunctionTypes/AnyFunction/AnyFunction";
export type { ComposableFunction } from "./Archetypes/FunctionTypes/ComposableFunction/ComposableFunction";

export type { AnyDataGuarantee } from "./Archetypes/FunctionTypes/DataGuarantee/AnyDataGuarantee";
export type { DataGuarantee } from "./Archetypes/FunctionTypes/DataGuarantee/DataGuarantee";
export type { DataGuaranteeOptions } from "./Archetypes/FunctionTypes/DataGuarantee/DataGuaranteeOptions";

export type { AnyDataGuard } from "./Archetypes/FunctionTypes/DataGuard/AnyDataGuard";
export type { DataGuard } from "./Archetypes/FunctionTypes/DataGuard/DataGuard";
export type { DataGuardOptions } from "./Archetypes/FunctionTypes/DataGuard/DataGuardOptions";

export type { AnyDataValidator } from "./Archetypes/FunctionTypes/DataValidator/AnyDataValidator";
export type { DataValidator } from "./Archetypes/FunctionTypes/DataValidator/DataValidator";
export type { DataValidatorOptions } from "./Archetypes/FunctionTypes/DataValidator/DataValidatorOptions";

export type { AnyFunctionalOption } from "./Archetypes/FunctionTypes/FunctionalOption/AnyFunctionalOption";
export type { FunctionalOption } from "./Archetypes/FunctionTypes/FunctionalOption/FunctionalOption";
export { applyFunctionalOptions } from "./Archetypes/FunctionTypes/FunctionalOption/applyFunctionalOptions";

export type { AnySmartConstructor } from "./Archetypes/FunctionTypes/SmartConstructor/AnySmartConstructor";
export type { SmartConstructor } from "./Archetypes/FunctionTypes/SmartConstructor/SmartConstructor";
export type { SmartConstructorOptions } from "./Archetypes/FunctionTypes/SmartConstructor/SmartConstructorOptions";

export type { AnyTypeGuarantee } from "./Archetypes/FunctionTypes/TypeGuarantee/AnyTypeGuarantee";
export type { TypeGuarantee } from "./Archetypes/FunctionTypes/TypeGuarantee/TypeGuarantee";
export type { TypeGuaranteeOptions } from "./Archetypes/FunctionTypes/TypeGuarantee/TypeGuaranteeOptions";

export type { AnyTypeGuard } from "./Archetypes/FunctionTypes/TypeGuard/AnyTypeGuard";
export type { TypeGuard } from "./Archetypes/FunctionTypes/TypeGuard/TypeGuard";
export type { TypeGuardOptions } from "./Archetypes/FunctionTypes/TypeGuard/TypeGuardOptions";

export type { AnyTypeValidator } from "./Archetypes/FunctionTypes/TypeValidator/AnyTypeValidator";
export type { TypeValidator } from "./Archetypes/FunctionTypes/TypeValidator/TypeValidator";
export type { TypeValidatorOptions } from "./Archetypes/FunctionTypes/TypeValidator/TypeValidatorOptions";

// Nominals
export type { AnyNominal } from "./Archetypes/Nominals/AnyNominal/AnyNominal";
export type { AnyBranded } from "./Archetypes/Nominals/Branded/AnyBranded";
export type { Branded } from "./Archetypes/Nominals/Branded/Branded";

export { MAKE_NOMINAL_TYPE_DEFAULT_OPTIONS } from "./Archetypes/Nominals/Factories/defaults/MAKE_NOMINAL_TYPE_DEFAULT_OPTIONS";
export type { MakeNominalTypeOptions } from "./Archetypes/Nominals/Factories/MakeNominalTypeOptions";
export { makeNominalType } from "./Archetypes/Nominals/Factories/makeNominalType";

export type { AnyFlavoured } from "./Archetypes/Nominals/Flavoured/AnyFlavoured";
export type { Flavoured } from "./Archetypes/Nominals/Flavoured/Flavoured";

// Utility Types
export type { AttributeFilterMap } from "./Archetypes/UtilityTypes/AttributeFilterMap";
export type { AttributeKeys } from "./Archetypes/UtilityTypes/AttributeKeys";
export type { AttributeTransformerMap } from "./Archetypes/UtilityTypes/AttributeTransformerMap";
export type { DeepImmutable } from "./Archetypes/UtilityTypes/DeepImmutable";
export type { Definitely } from "./Archetypes/UtilityTypes/Definitely";
export type { EquivalentKeys } from "./Archetypes/UtilityTypes/EquivalentKeys";
export type { EquivalentOptionalKeys } from "./Archetypes/UtilityTypes/EquivalentOptionalKeys";
export type { EquivalentOptionalPart } from "./Archetypes/UtilityTypes/EquivalentOptionalPart";
export type { EquivalentPart } from "./Archetypes/UtilityTypes/EquivalentPart";
export type { IdenticallyNamedKeys } from "./Archetypes/UtilityTypes/IdenticallyNamedKeys";
export type { IdenticallyNamedPart } from "./Archetypes/UtilityTypes/IdenticallyNamedPart";
export type { IfEquals } from "./Archetypes/UtilityTypes/IfEquals";
export type { Immutable } from "./Archetypes/UtilityTypes/Immutable";
export type { Maybe } from "./Archetypes/UtilityTypes/Maybe";
export type { NonNullable } from "./Archetypes/UtilityTypes/NonNullable";
export type { Nullable } from "./Archetypes/UtilityTypes/Nullable";
export type { OptionalKeys } from "./Archetypes/UtilityTypes/OptionalKeys";
export type { OptionalPart } from "./Archetypes/UtilityTypes/OptionalPart";
export type { RequireAllAttributesMap } from "./Archetypes/UtilityTypes/RequireAllAttributesMap";
export type { ValueOf } from "./Archetypes/UtilityTypes/ValueOf";
export type { WritableKeys } from "./Archetypes/UtilityTypes/WritableKeys";
export type { WritablePart } from "./Archetypes/UtilityTypes/WritablePart";

// Values
export type { AnyValue } from "./Archetypes/Values/Value/AnyValue";
export type { Value } from "./Archetypes/Values/Value/Value";
export { isValue } from "./Archetypes/Values/Value/isValue";
export { isValueOf } from "./Archetypes/Values/Value/isValueOf";
export { mustBeValue } from "./Archetypes/Values/Value/mustBeValue";
export { mustBeValueOf } from "./Archetypes/Values/Value/mustBeValueOf";
export { validateValue } from "./Archetypes/Values/Value/validateValue";
export { validateValueOf } from "./Archetypes/Values/Value/validateValueOf";
export { ValueObject } from "./Archetypes/Values/ValueObject/ValueObject";

// ================================================================
//
// Basic Types
//
// ----------------------------------------------------------------

export { isAny } from "./BasicTypes/Any/isAny";
export { mustBeAny } from "./BasicTypes/Any/mustBeAny";
export { validateAny } from "./BasicTypes/Any/validateAny";

export type { AnyArrayKey } from "./BasicTypes/Arrays/AnyArrayKey";
export type { NonEmptyArray } from "./BasicTypes/Arrays/NonEmptyArray";
export { isArray } from "./BasicTypes/Arrays/isArray";
export { isNonEmptyArray } from "./BasicTypes/Arrays/isNonEmptyArray";
export { mustBeArray } from "./BasicTypes/Arrays/mustBeArray";
export { mustBeNonEmptyArray } from "./BasicTypes/Arrays/mustBeNonEmptyArray";
export { validateArray } from "./BasicTypes/Arrays/validateArray";
export { validateArrayOf } from "./BasicTypes/Arrays/validateArrayOf";
export { validateNonEmptyArray } from "./BasicTypes/Arrays/validateNonEmptyArray";

export type { AnyBooleanishValidator } from "./BasicTypes/Booleanish/BooleanishRules/AnyBooleanishValidator";
export type { BooleanishRules } from "./BasicTypes/Booleanish/BooleanishRules/BooleanishRules";
export type { BooleanishValidator } from "./BasicTypes/Booleanish/BooleanishRules/BooleanishValidator";
export type { BooleanishValidatorOptions } from "./BasicTypes/Booleanish/BooleanishRules/BooleanishValidatorOptions";
export { DEFAULT_BOOLEANISH_RULES } from "./BasicTypes/Booleanish/defaults/DEFAULT_BOOLEANISH_RULES";

export { validateBooleanishData } from "./BasicTypes/Booleanish/validateBooleanishData/validateBooleanishData";

export type { BooleanishDataOptions } from "./BasicTypes/Booleanish/BooleanishDataOptions";
export { isBooleanishData } from "./BasicTypes/Booleanish/isBooleanishData";
export { mustBeBooleanishData } from "./BasicTypes/Booleanish/mustBeBooleanishData";

// Booleans
export { isBoolean } from "./BasicTypes/Booleans/isBoolean";
export { mustBeBoolean } from "./BasicTypes/Booleans/mustBeBoolean";
export { validateBoolean } from "./BasicTypes/Booleans/validateBoolean";

// Classes
export { getClassNames } from "./BasicTypes/Classes/getClassNames";

// Functions
export { isFunction } from "./BasicTypes/Functions/isFunction";
export { mustBeFunction } from "./BasicTypes/Functions/mustBeFunction";
export { validateFunction } from "./BasicTypes/Functions/validateFunction";

// HashMaps
export type { AnyHashMap } from "./BasicTypes/HashMaps/AnyHashMap";
export { HashMap } from "./BasicTypes/HashMaps/HashMap";
export { isHashMap } from "./BasicTypes/HashMaps/isHashMap";
export { mustBeHashMap } from "./BasicTypes/HashMaps/mustBeHashMap";
export { validateHashMap } from "./BasicTypes/HashMaps/validateHashMap";

// Integers
export { isInteger } from "./BasicTypes/Integers/isInteger";
export { mustBeInteger } from "./BasicTypes/Integers/mustBeInteger";
export { validateInteger } from "./BasicTypes/Integers/validateInteger";

// Numbers
export { isNumber } from "./BasicTypes/Numbers/isNumber";
export { mustBeNumber } from "./BasicTypes/Numbers/mustBeNumber";
export { validateNumber } from "./BasicTypes/Numbers/validateNumber";
export { validateNumberIsInteger } from "./BasicTypes/Numbers/validateNumberIsInteger";
export { validateNumberRange } from "./BasicTypes/Numbers/validateNumberRange";

// Numerical
export type { numerical } from "./BasicTypes/numerical/numerical";
export type { NumericalConversionRules } from "./BasicTypes/numerical/NumericalConversionRules";
export { DEFAULT_NUMERICAL_CONVERSION_RULES } from "./BasicTypes/numerical/defaults/DEFAULT_NUMERICAL_CONVERSION_RULES";
export { resolveNumerical } from "./BasicTypes/numerical/resolveNumerical";
export { validateNumericalData } from "./BasicTypes/numerical/validateNumericalData";

// Object Filters
export type { PropertyFilter } from "./BasicTypes/Objects/Filters/PropertyFilter";
export type { PropertyFilterData } from "./BasicTypes/Objects/Filters/PropertyFilterData";
export { FIND_PROPERTIES_FILTER_DROP_CONSTRUCTORS } from "./BasicTypes/Objects/Filters/defaults/FIND_PROPERTIES_FILTER_DROP_CONSTRUCTORS";
export { FIND_PROPERTIES_FILTER_DROP_INTERNAL } from "./BasicTypes/Objects/Filters/defaults/FIND_PROPERTIES_FILTER_DROP_INTERNAL";
export { FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES } from "./BasicTypes/Objects/Filters/defaults/FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES";
export { FIND_PROPERTIES_FILTER_KEEP_METHODS } from "./BasicTypes/Objects/Filters/defaults/FIND_PROPERTIES_FILTER_KEEP_METHODS";
export { FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE } from "./BasicTypes/Objects/Filters/defaults/FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE";
export { FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS } from "./BasicTypes/Objects/Filters/PropertyDescriptors/defaults/FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS";
export { findAttributes } from "./BasicTypes/Objects/Filters/PropertyDescriptors/findAttributes";
export { findMethods } from "./BasicTypes/Objects/Filters/PropertyDescriptors/findMethods";
export { findProperties } from "./BasicTypes/Objects/Filters/PropertyDescriptors/findProperties";
export type { PropertyDescriptorFilter } from "./BasicTypes/Objects/Filters/PropertyDescriptors/PropertyDescriptorFilter";
export type { PropertyDescriptorFilterData } from "./BasicTypes/Objects/Filters/PropertyDescriptors/PropertyDescriptorFilterData";
export type { PropertyDescriptorFilterOptions } from "./BasicTypes/Objects/Filters/PropertyDescriptors/PropertyDescriptorFilterOptions";
export { FIND_PROPERTY_NAMES_DEFAULT_OPTIONS } from "./BasicTypes/Objects/Filters/PropertyNames/defaults/FIND_PROPERTY_NAMES_DEFAULT_OPTIONS";
export { findAttributeNames } from "./BasicTypes/Objects/Filters/PropertyNames/findAttributeNames";
export { findMethodNames } from "./BasicTypes/Objects/Filters/PropertyNames/findMethodNames";
export { findPropertyNames } from "./BasicTypes/Objects/Filters/PropertyNames/findPropertyNames";
export type { PropertyNameFilter } from "./BasicTypes/Objects/Filters/PropertyNames/PropertyNameFilter";
export type { PropertyNameFilterData } from "./BasicTypes/Objects/Filters/PropertyNames/PropertyNameFilterData";
export type { PropertyNameFilterOptions } from "./BasicTypes/Objects/Filters/PropertyNames/PropertyNameFilterOptions";

// Objects
export { assignOptionalFields } from "./BasicTypes/Objects/assignOptionalFields";
export { assignOptionalFieldsUsingTransformers } from "./BasicTypes/Objects/assignOptionalFieldsUsingTransformers";
export { deleteProperty } from "./BasicTypes/Objects/deleteProperty";
export { getAllMethodNames } from "./BasicTypes/Objects/getAllMethodNames";
export { getAllMethods } from "./BasicTypes/Objects/getAllMethods";
export { getMissingMethodNames } from "./BasicTypes/Objects/getMissingMethodNames";
export { getProperty } from "./BasicTypes/Objects/getProperty";
export { getPublicMethodNames } from "./BasicTypes/Objects/getPublicMethodNames";
export { getPublicMethods } from "./BasicTypes/Objects/getPublicMethods";
export { hasProperty } from "./BasicTypes/Objects/hasProperty";
export { isAttributeName } from "./BasicTypes/Objects/isAttributeName";
export { isGetterName } from "./BasicTypes/Objects/isGetterName";
export { isMethodName } from "./BasicTypes/Objects/isMethodName";
export { isObject } from "./BasicTypes/Objects/isObject";
export { isObjectish } from "./BasicTypes/Objects/isObjectish";
export { mustBeObject } from "./BasicTypes/Objects/mustBeObject";
export { mustBeObjectish } from "./BasicTypes/Objects/mustBeObjectish";
export type { NonNullableObject } from "./BasicTypes/Objects/NonNullObject";
export { validateObject } from "./BasicTypes/Objects/validateObject";
export { validateObjectHasAllMethodsCalled } from "./BasicTypes/Objects/validateObjectHasAllMethodsCalled";
export { validateObjectish } from "./BasicTypes/Objects/validateObjectish";
export { validateObjectNotEmpty } from "./BasicTypes/Objects/validateObjectNotEmpty";

// Option Types
export { validateOptionType } from "./BasicTypes/Options/validateOptionType";

// Primitives
export type { Primitive } from "./BasicTypes/Primitives/Primitive";
export type { PrimitiveOrFunction } from "./BasicTypes/Primitives/PrimitiveOrFunction";
export type { PrimitiveOrUndefined } from "./BasicTypes/Primitives/PrimitiveOrUndefined";
export type { Primitivish } from "./BasicTypes/Primitives/Primitivish";

// Prototypes
export { NEXT_PROTOTYPE } from "./BasicTypes/Prototypes/defaults/NEXT_PROTOTYPE";
export { STOP_AT_NEXT_PROTOTYPE } from "./BasicTypes/Prototypes/defaults/STOP_AT_NEXT_PROTOTYPE";
export { STOP_AT_OBJECT_PROTOTYPE } from "./BasicTypes/Prototypes/defaults/STOP_AT_OBJECT_PROTOTYPE";
export type { Prototype } from "./BasicTypes/Prototypes/Prototype";
export type { NextPrototypeChain } from "./BasicTypes/Prototypes/NextPrototypeChain";
export { getPrototypeOf } from "./BasicTypes/Prototypes/getPrototypeOf";

// Regex
export { Regex } from "./BasicTypes/Regex/Regex";
export type { RegExpExecArrayWithGroups } from "./BasicTypes/Regex/RegExpExecArrayWithGroups";
export { isRegExpExecArrayWithGroups } from "./BasicTypes/Regex/isRegExpExecArrayWithGroups";
export { mustBeRegExpExecArrayWithGroups } from "./BasicTypes/Regex/mustBeRegExpExecArrayWithGroups";
export { regexMustCompile } from "./BasicTypes/Regex/regexMustCompile";
export { validateRegexCompiles } from "./BasicTypes/Regex/validateRegexCompiles";
export { validateRegExpExecArrayWithGroups } from "./BasicTypes/Regex/validateRegExpExecArrayWithGroups";

// Strings
export { isString } from "./BasicTypes/Strings/isString";
export { mustBeString } from "./BasicTypes/Strings/mustBeString";
export { validateString } from "./BasicTypes/Strings/validateString";
export { validateStringLengthBetween } from "./BasicTypes/Strings/validateStringLengthBetween";
export { validateStringMatches } from "./BasicTypes/Strings/validateStringMatches";
export { validateStringMinLength } from "./BasicTypes/Strings/validateStringMinLength";
export { validateStringStartsWith } from "./BasicTypes/Strings/validateStringStartsWith";
export { validateStringValue } from "./BasicTypes/Strings/validateStringValue";

// Unknowns
export { getTypeNames } from "./BasicTypes/Unknowns/getTypeNames";

// ================================================================
//
// Error Handling
//
// ----------------------------------------------------------------

// AppError
export type { AnyAppError } from "./ErrorHandling/AppError/AnyAppError";
export type { AnyAppErrorConstructor } from "./ErrorHandling/AppError/AnyAppErrorConstructor";
export { AppError } from "./ErrorHandling/AppError/AppError";
export type { AppErrorData } from "./ErrorHandling/AppError/AppErrorData";
export { isAppError } from "./ErrorHandling/AppError/isAppError";

// AppErrorOr
export type { AppErrorOr } from "./ErrorHandling/AppErrorOr/AppErrorOr";

// DataPath
export type { DataPath } from "./ErrorHandling/DataPath/DataPath";
export { DEFAULT_DATA_PATH } from "./ErrorHandling/DataPath/defaults/DEFAULT_DATA_PATH";
export { MAKE_DATA_PATH_DEFAULT_OPTIONS } from "./ErrorHandling/DataPath/defaults/MAKE_DATA_PATH_DEFAULT_OPTIONS";
export { extendDataPath } from "./ErrorHandling/DataPath/extendDataPath";
export { isDataPathData } from "./ErrorHandling/DataPath/isDataPathData";
export { makeDataPath } from "./ErrorHandling/DataPath/makeDataPath";
export type { MakeDataPathOptions } from "./ErrorHandling/DataPath/MakeDataPathOptions";
export { mustBeDataPathData } from "./ErrorHandling/DataPath/mustBeDataPathData";
export { validateDataPathData } from "./ErrorHandling/DataPath/validateDataPathData";

// ExtraData
export type { AllExtraData } from "./ErrorHandling/ExtraData/AllExtraData";
export type { AnyExtraData } from "./ErrorHandling/ExtraData/AnyExtraData";
export type { ExtraData } from "./ErrorHandling/ExtraData/ExtraData";
export type { ExtraLogsOnlyData } from "./ErrorHandling/ExtraData/ExtraLogsOnlyData";
export type { ExtraPublicData } from "./ErrorHandling/ExtraData/ExtraPublicData";
export type { NoExtraData } from "./ErrorHandling/ExtraData/NoExtraData";

// Helpers
export { DEFAULT_ERROR_REASON } from "./ErrorHandling/Helpers/defaults/DEFAULT_ERROR_REASON";
export { extractReasonFromCaught } from "./ErrorHandling/Helpers/extractReasonFromCaught";
export { extractStackFromCaught } from "./ErrorHandling/Helpers/extractStackFromCaught";

// OnError
export { ON_ERROR_DEFAULT_OPTIONS } from "./ErrorHandling/OnError/defaults/ON_ERROR_DEFAULT_OPTIONS";
export { THROW_THE_ERROR } from "./ErrorHandling/OnError/defaults/THROW_THE_ERROR";
export type { OnError } from "./ErrorHandling/OnError/OnError";
export type { OnErrorOptions } from "./ErrorHandling/OnError/OnErrorOptions";

// StructuredProblemReport
export { makeStructuredProblemReport } from "./ErrorHandling/StructuredProblemReport/makeStructuredProblemReport";
export { StructuredProblemReport } from "./ErrorHandling/StructuredProblemReport/StructuredProblemReport";
export type { StructuredProblemReportData } from "./ErrorHandling/StructuredProblemReport/StructuredProblemReportData";

// ================================================================
//
// Errors
//
// ----------------------------------------------------------------

export { MODULE_NAME } from "./Errors/defaults/MODULE_NAME";
export type { ArrayCannotBeEmptyData } from "./Errors/ArrayCannotBeEmpty/ArrayCannotBeEmptyData";
export { ArrayCannotBeEmptyError } from "./Errors/ArrayCannotBeEmpty/ArrayCannotBeEmptyError";
export type { ExtensionDefinesNoMethodsData } from "./Errors/ExtensionDefinesNoMethods/ExtensionDefinesNoMethodsData";
export { ExtensionDefinesNoMethodsError } from "./Errors/ExtensionDefinesNoMethods/ExtensionDefinesNoMethodsError";
export type { HttpStatusCodeOutOfRangeData } from "./Errors/HttpStatusCodeOutOfRange/HttpStatusCodeOutOfRangeData";
export { HttpStatusCodeOutOfRangeError } from "./Errors/HttpStatusCodeOutOfRange/HttpStatusCodeOutOfRangeError";
export { createHttpStatusCodeOutOfRangeError } from "./Errors/HttpStatusCodeOutOfRange/createHttpStatusCodeOutOfRangeError";
export type { InvalidNodeJSModuleNameData } from "./Errors/InvalidNodeJSModuleName/InvalidNodeJSModuleNameData";
export { InvalidNodeJSModuleNameError } from "./Errors/InvalidNodeJSModuleName/InvalidNodeJSModuleNameError";
export type { NotImplementedData } from "./Errors/NotImplemented/NotImplementedData";
export { NotImplementedError } from "./Errors/NotImplemented/NotImplementedError";
export type { NumberOutOfRangeData } from "./Errors/NumberOutOfRange/NumberOutOfRangeData";
export { NumberOutOfRangeError, type NumberOutOfRangeErrorConstructor } from "./Errors/NumberOutOfRange/NumberOutOfRangeError";
export { createNumberOutOfRangeError } from "./Errors/NumberOutOfRange/createNumberOutOfRangeError";
export type { ObjectCannotBeEmptyData } from "./Errors/ObjectCannotBeEmpty/ObjectCannotBeEmptyData";
export { ObjectCannotBeEmptyError } from "./Errors/ObjectCannotBeEmpty/ObjectCannotBeEmptyError";
export type { ObjectHasMissingMethodsData } from "./Errors/ObjectHasMissingMethods/ObjectHasMissingMethodsData";
export { ObjectHasMissingMethodsError } from "./Errors/ObjectHasMissingMethods/ObjectHasMissingMethodsError";
export type { ObjectIsImmutableData } from "./Errors/ObjectIsImmutable/ObjectIsImmutableData";
export { ObjectIsImmutableError } from "./Errors/ObjectIsImmutable/ObjectIsImmutableError";
export type { RegexDoesNotCompileData } from "./Errors/RegexDoesNotCompile/RegexDoesNotCompileData";
export { RegexDoesNotCompileError } from "./Errors/RegexDoesNotCompile/RegexDoesNotCompileError";
export type { RegexReturnedNoNamedGroupsData } from "./Errors/RegexReturnedNoNamedGroups/RegexReturnedNoNamedGroupsData";
export { RegexReturnedNoNamedGroupsError } from "./Errors/RegexReturnedNoNamedGroups/RegexReturnedNoNamedGroupsError";
export type { RegexReturnedNoResultsData } from "./Errors/RegexReturnedNoResults/RegexReturnedNoResultsData";
export { RegexReturnedNoResultsError } from "./Errors/RegexReturnedNoResults/RegexReturnedNoResultsError";
export type { StringIsTooShortData } from "./Errors/StringIsTooShort/StringIsTooShortData";
export { StringIsTooShortError } from "./Errors/StringIsTooShort/StringIsTooShortError";
export type { UnreachableCodeData } from "./Errors/UnreachableCode/UnreachableCodeData";
export { UnreachableCodeError } from "./Errors/UnreachableCode/UnreachableCodeError";
export type { UnsupportedBooleanishValueData } from "./Errors/UnsupportedBooleanishValue/UnsupportedBooleanishValueData";
export { UnsupportedBooleanishValueError } from "./Errors/UnsupportedBooleanishValue/UnsupportedBooleanishValueError";
export type { UnsupportedNumericalValueData } from "./Errors/UnsupportedNumericalValue/UnsupportedNumericalValueData";
export { UnsupportedNumericalValueError } from "./Errors/UnsupportedNumericalValue/UnsupportedNumericalValueError";
export type { UnsupportedStringLengthRangeData } from "./Errors/UnsupportedStringLengthRange/UnsupportedStringLengthRangeData";
export { UnsupportedStringLengthRangeError } from "./Errors/UnsupportedStringLengthRange/UnsupportedStringLengthRangeError";
export type { UnsupportedStringPrefixData } from "./Errors/UnsupportedStringPrefix/UnsupportedStringPrefixData";
export { UnsupportedStringPrefixError } from "./Errors/UnsupportedStringPrefix/UnsupportedStringPrefixError";
export type { UnsupportedStringValueData } from "./Errors/UnsupportedStringValue/UnsupportedStringValueData";
export { UnsupportedStringValueError } from "./Errors/UnsupportedStringValue/UnsupportedStringValueError";
export type { UnsupportedTypeData } from "./Errors/UnsupportedType/UnsupportedTypeData";
export { UnsupportedTypeError } from "./Errors/UnsupportedType/UnsupportedTypeError";

// ================================================================
//
// Operators
//
// ----------------------------------------------------------------

export { everyGuard } from "./Operators/everyGuard/everyGuard";
export { isData } from "./Operators/isData/isData";
export { isType } from "./Operators/isType/isType";
export { mustBe } from "./Operators/mustBe/mustBe";
export type { MustBePipelineStep } from "./Operators/mustBe/MustBePipelineStep";
export { recast } from "./Operators/recast/recast";
export { someGuards } from "./Operators/someGuards/someGuards";
export { validate } from "./Operators/validate/validate";
export type { ValidationPipelineStep } from "./Operators/validate/ValidationPipelineStep";

// ================================================================
//
// Protocols
//
// ----------------------------------------------------------------

export type { Has } from "./Protocols/Has/Has";
export { implementsHas } from "./Protocols/Has/implementsHas";

export type { Stack } from "./Protocols/Stack/Stack";
export { implementsStack } from "./Protocols/Stack/implementsStack";

export type { ToPrimitive } from "./Protocols/ToPrimitive/ToPrimitive";
export type { PrimitiveHint } from "./Protocols/ToPrimitive/PrimitiveHint";
export { implementsToPrimitive } from "./Protocols/ToPrimitive/implementsToPrimitive";

export type { ToString } from "./Protocols/ToString/ToString";
export { implementsOwnOrInheritedToString } from "./Protocols/ToString/implementsOwnOrInheritedToString";
export { implementsToString } from "./Protocols/ToString/implementsToString";

// ================================================================
//
// Protocols and Extensions
//
// ----------------------------------------------------------------

export { addExtension } from "./ProtocolsExtensions/Extensions/addExtension";
export { implementsProtocol } from "./ProtocolsExtensions/Protocol/implementsProtocol";
export { validateImplementsProtocol } from "./ProtocolsExtensions/Protocol/validateImplementsProtocol";
export type { ProtocolDefinition } from "./ProtocolsExtensions/ProtocolDefinition/ProtocolDefinition";
export { makeProtocolDefinition } from "./ProtocolsExtensions/ProtocolDefinition/makeProtocolDefinition";

// ================================================================
//
// Refined Types
//
// ----------------------------------------------------------------

// AnyPrimitiveType
export type { AnyPrimitiveType } from "./RefinedTypes/AnyPrimitiveType/AnyPrimitiveType";

// RefinedNumber
export type { AnyRefinedNumber } from "./RefinedTypes/RefinedNumber/AnyRefinedNumber";
export { RefinedNumber } from "./RefinedTypes/RefinedNumber/RefinedNumber";

// RefinedPrimitive
export type { AnyRefinedPrimitive } from "./RefinedTypes/RefinedPrimitive/AnyRefinedPrimitive";
export { RefinedPrimitive } from "./RefinedTypes/RefinedPrimitive/RefinedPrimitive";

// RefinedString
export type { AnyRefinedString } from "./RefinedTypes/RefinedString/AnyRefinedString";
export { RefinedString } from "./RefinedTypes/RefinedString/RefinedString";

// RefinedType
export type { AnyRefinedType } from "./RefinedTypes/RefinedType/AnyRefinedType";
export { RefinedType } from "./RefinedTypes/RefinedType/RefinedType";

// ================================================================
//
// Supporting Types
//
// ----------------------------------------------------------------

// DispatchMap
export type { AnyDispatchMap } from "./SupportingTypes/DispatchMap/AnyDispatchMap";
export type { AnyDispatchMapKey } from "./SupportingTypes/DispatchMap/AnyDispatchMapKey";
export type { DispatchMap } from "./SupportingTypes/DispatchMap/DispatchMap";
export type { DispatchMapReturnTypes } from "./SupportingTypes/DispatchMap/DispatchMapReturnTypes";
export { searchDispatchMap } from "./SupportingTypes/DispatchMap/searchDispatchMap";

// FunctionPointerTable
export type { AnyFunctionPointerTable } from "./SupportingTypes/FunctionPointerTable/AnyFunctionPointerTable";
export type { FunctionPointerTable } from "./SupportingTypes/FunctionPointerTable/FunctionPointerTable";
export { searchFunctionPointerTable } from "./SupportingTypes/FunctionPointerTable/searchFunctionPointerTable";

// HttpStatusCode
export { MAKE_HTTP_STATUS_CODE_DEFAULT_OPTIONS } from "./SupportingTypes/HttpStatusCode/defaults/MAKE_HTTP_STATUS_CODE_DEFAULT_OPTIONS";
export type { HttpStatusCode } from "./SupportingTypes/HttpStatusCode/HttpStatusCode";
export { isHttpStatusCodeData } from "./SupportingTypes/HttpStatusCode/isHttpStatusCodeData";
export { makeHttpStatusCode } from "./SupportingTypes/HttpStatusCode/makeHttpStatusCode";
export type { MakeHttpStatusCodeOptions } from "./SupportingTypes/HttpStatusCode/MakeHttpStatusCodeOptions";
export { mustBeHttpStatusCodeData } from "./SupportingTypes/HttpStatusCode/mustBeHttpStatusCodeData";
export { validateHttpStatusCodeData } from "./SupportingTypes/HttpStatusCode/validateHttpStatusCodeData";
export { validateHttpStatusCodeDataRange } from "./SupportingTypes/HttpStatusCode/validateHttpStatusCodeDataRange";

// NodeJsModuleName
export { MAKE_NODEJS_MODULE_NAME_DEFAULT_OPTIONS } from "./SupportingTypes/NodeJSModuleName/defaults/MAKE_NODEJS_MODULE_NAME_DEFAULT_OPTIONS";
export type { NodeJSModuleName } from "./SupportingTypes/NodeJSModuleName/NodeJSModuleName";
export type { MakeNodeJSModuleNameOptions } from "./SupportingTypes/NodeJSModuleName/MakeNodeJSModuleNameOptions";
export { isNodeJSModuleNameData } from "./SupportingTypes/NodeJSModuleName/isNodeJSModuleNameData";
export { makeNodeJSModuleName } from "./SupportingTypes/NodeJSModuleName/makeNodeJSModuleName";
export { mustBeNodeJSModuleNameData } from "./SupportingTypes/NodeJSModuleName/mustBeNodeJSModuleNameData";
export { validateNodeJSModuleNameData } from "./SupportingTypes/NodeJSModuleName/validateNodeJSModuleNameData";
export * from "./SupportingTypes/NodeJSModuleName/regexes";