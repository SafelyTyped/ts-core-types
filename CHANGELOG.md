# CHANGELOG

## Introduction

This CHANGELOG tells you:

* when a release was made
* what is in each release

It also tells you what changes have been completed, and will be included in the next tagged release.

For each release, changes are grouped under these headings:

* _Backwards-Compatibility Breaks_: a list of any backwards-compatibility breaks
* _New_: a list of new features. If the feature came from a contributor via a PR, make sure you link to the PR and give them a mention here.
* _Fixes_: a list of bugs that have been fixed. If there's an issue for the bug, make sure you link to the GitHub issue here.
* _Dependencies_: a list of dependencies that have been added / updated / removed.
* _Tools_: a list of bundled tools that have been added / updated / removed.

## develop branch

The following changes have been completed, and will be included in the next tagged release.

### Documentation

- Added Microsoft's API-Extractor
- Updated all docblocks to be compatible with api-extractor

## v0.3.2

Released Saturday, 3rd July 2021.

### New

* Archetypes
  - added `AnyDataGuarantee` type
  - added `AnyDataGuard` type
  - added `AnyDataValidator` type
  - added `AnyEntity` type
  - added `AnyEntityObject` type
  - added `AnyTypeGuarantee` type
  - added `AnyTypeGuard` type
  - added `AnyTypeValidator` type
* BasicTypes
  - added `mustBeNonEmptyArray()` TypeGuarantee
* Operators
  - added `everyGuard()`
  - added `someGuards()`

### Fixes

* Archetypes
  - `DataGuard.ts` file moved into its own folder
  - `SmartConstructor` user-defined options / functional options' options definition has been simplified
    - both of these template parameters now enforce compatibility with `SmartConstructorOptions`, instead of relying on intersection types buried within the definition
* BasicTypes
  - added missing export for `mustBeArray()`
  - improved type-inference for `isNonEmptyArray()`
  - switch to safer 'arrays of unknown type'
    - isArray()
    - mustBeArray()
    - validateArray()
    - validateArrayOf()
    - validateNonEmptyArray()
  - added explicit `TypeGuard` signature
    - isInteger()
    - isNumber()
    - isString()
* Nominals
  - moved `AnyBranded` type into its own file
  - moved `AnyFlavoured` type into its own file
* Operators
  - moved `recast` into its own subfolder

### Deprecations

* BasicTypes
  - deprecated Filter; use the DataGuard type instead
  - deprecated everyFilter(); use everyGuard() instead
  - deprecated someFilters(); use someGuards() instead

### Tests

* ErrorHandling
  - additional unit tests for `isAppError()`, to prove it does not crash when given non-objects

## v0.3.1

Released Wednesday, 26th May 2021.

### Dependencies

* Update all dependencies to the latest version.

## v0.3.0

Released Tuesday, 22nd December 2020.

### B/C Breaks

The following changes were needed for TypeScript v4 compatibility:

* `makeNominalType()` now requires user-defined options to be based on `MakeNominalTypeOptions` instead of `object`
* `DataGuarantee` type now requires user-defined options to be based on `DataGuaranteeOptions` instead of `object`
* `TypeGuarantee` type now requires user-defined options to be based on `TypeGuaranteeOptions` instead of `object`

The following changes may break existing code:

* `ToPrimitive` protocol now supports returning `bool` type too
  - apparently, `[Symbol.toPrimitive]: (hint) => bool` is a legal thing!

### New

* Basic Types
  - added `Immutable`
  - added `DeepImmutable`
  - added `Primitive`
  - added `PrimitiveOrFunction`
  - added `PrimitiveOrUndefined`
  - added `Primitivish`

## v0.2.6

Released Sunday, 4th October 2020.

### New

* Basic Types
  - added `HashMap.first()`
  - added `HashMap.firstKey()`
  - added `HashMap.keys()`
  - `HashMap` can now store functions

## v0.2.5

Released Wednesday, 23rd September 2020.

### New

* Basic Types
  - added `HashMap.every()`
  - added `HashMap.filter()`
  - added `HashMap.some()`

## v0.2.4

Released Sunday, 20th September 2020.

### Fixes

* More missing exports
  - added global export for `mustBeRegExpExecArrayWithGroups()`

## v0.2.3

Released Sunday, 20th September 2020.

### Fixes

* Missing exports
  - add global export for BasicTypes / Booleanish
  - add global export for BasicTypes / Functions

## v0.2.2

Released Sunday, 20th September 2020.

### New

* Basic Types / Functions
  * Added `isFunction()`
  * Added `mustBeFunction()`
  * Added `validateFunction()`
* Basic Types / Regex
  * Added `RegexReturnedNoResultsError`
  * Added `Regex` type
  * Added `RegexReturnedNoNamedGroupsError`
  * Added `RegExpArrayWithGroups` type
  * Added `isRegExpExecArrayWithGroups()`
  * Added `mustBeRegExpExecArrayWithGroups()`
  * Added `validateRegExpExecArrayWithGroups()`
* Basic Types / Objects
  * Added `ObjectCannotBeEmptyError`
  * Added `validateObjectNotEmpty()`

### Tests

* `getTypeNames()`
  - added missing test case for arrays

## v0.2.1

Released Sunday, 6th September 2020.

### New

* Added `HashMap.forEach()`

### Tests

* `extractReasonFromCaught()` and `extractStackFromCaught()`
  - unit tests no longer look for `Context.<anonymous>` in the stack trace

### Dependencies

* Updated dev dependencies to resolve low-severity `npm audit` warnings.

## v0.2.0

Released Friday, 10th July 2020.

### B/C Breaks

* `assignOptionalFields()`
  - parameter `fieldsList` has changed type, from an array to an object
    - delivers stronger type-safety over the original design
* `AttributeNames` is now `AttributeKeys`
  - consistent naming with other utility types that return keys from objects
* `AttributeTransformers` has been removed
  - it has been replaced by `AttributeTransformerMap`
* `TransformedAttributes` has been removed
  - it's been designed out

### New

* Utility Types
  - added `AttributeFilterMap`
  - added `AttributeTransformerMap`
  - added `IfEquals`
  - added `EquivalentKeys`
  - added `EquivalentOptionalKeys`
  - added `EquivalentOptionalPart`
  - added `EquivalentPart`
  - added `IdenticallyNamedKeys`
  - added `IdenticallyNamedPart`
  - added `OptionalKeys`
  - added `OptionalPart`
  - added `WritableKeys`
  - added `WritablePart`

### Fixes

* Basic Types
  * `assignOptionalFieldsUsingTransformers()`
    - the transformer functions can now be lambdas
    - if there's a problem with the transformers, the compiler now complains about the transformer function that's wrong, instead of complaining about `target`
* Utility Types
  - `AttributeNames` no longer returns `undefined` in the enum

## v0.1.15

### New

* Archetypes / Utility Types (new module!)
  - added `AttributeNames` utility type
  - added `AttributeTransformers` utility type
  - added `Definitely` utility type
  - added `Maybe` utility type
  - added `TransformedAttributes` utility type
* Basic Types
  - added `assignOptionalFields()`
  - added `assignOptionalFieldsUsingTransformers()`

### Fixes

* Supporting Types
  - `FunctionPointerTable` now supports all `keyof` types as keys

## v0.1.14

Released Wednesday, 8th July 2020

### New

* Basic Types
  - added `validateArrayOf()`
  - added `validateNonEmptyArray()`
  - added `validateOptionType()`
  - added `validateRegexCompiles()`
  - added `validateStringMatches()`
* Errors
  - added `ArrayCannotBeEmptyError`
  - added `RegexDoesNotCompileError`
  - added `UnsupportedStringValueError`

### Fixes

* Basic Types
  - `validateStringStartsWith()` is now part of the public API
  - `validateStringValue()` only accepts strings now

## v0.1.13

Released Wednesday, 8th July 2020.

### New

* Basic Types
  - added `mustBeAny()`
  - added `validateAny()`

## v0.1.12

Released Wednesday, 1st July 2020.

### New

* Errors
  - added `NotImplementedError`

### Fixes

* Errors
  - `ObjectIsImmutableError` now has an accurate description message

## v0.1.11

Released Tuesday, 30th June 2020.

### New

* Errors
  - added `ObjectIsImmutableError`

## v0.1.10

Released Tuesday, 23rd June 2020.

### Fixes

* Archetypes
  * Function Types
    - SmartConstructor now applies `Partial<>` to `OPT`
    - SmartConstructor now applies `Partial<>` to `FN_OPT`
      - was preventing the caller from passing in partial option objects

## v0.1.9

Released Monday, 22nd June 2020.

### Fixes

* Archetypes
  * Nominals
    - `MakeNominalTypeOptions` is now compatible with `TypeGuaranteeOptions`
    - `makeNominalType()` now uses a deconstructed object to support user-supplied options
* Option Types
  * DataPath
    - added missing `MakeDataPathOptions`
    - added missing `MAKE_DATA_PATH_DEFAULT_OPTIONS`
    - `makeDataPath()` options are now compatible with the `TypeGuaranteeOptions`
  * HttpStatusCode
    - `makeHttpStatusCode()` options are now compatible with the `TypeGuaranteeOptions`
  * NodeJSModuleName
    - `makeNodeJSModuleName()` options are now compatible with the `TypeGuaranteeOptions`

## v0.1.8

Released Monday, 22nd June 2020.

### Fixes

* Option Types
  - `validateNumericalData()` function signature updated to show it returns an `AppErrorOr<number>`
    - makes it easier to chain validators together

## v0.1.7

Released Sunday, 21st June 2020.

### New

* Archetypes
  - added `AnyFunction`
  - added `ComposableFunction`
* BasicTypes
  - added `BooleanishValidatorOptions`
* Errors
  - added `UnsupportedNumericalValueError`
* Option Types
  * numerical (new type!)
    - added `numerical` option type
    - added `NumericalConversionRules` function pointer table
    - added `DEFAULT_NUMERICAL_CONVERSION_RULES`
    - added `resolveNumerical()`
    - added `validateNumericalData()`
* Protocols
  - added `ToPrimitive` protocol
  - added `PrimitiveHint` type
* RefinedTypes
  - `RefinedNumber` now implements `ToPrimitive`
  - `RefinedString` now implements `ToPrimitive`
* SupportingTypes
  * FunctionPointerTable (new type!)
    - added `FunctionPointerTable`
    - added `AnyFunctionPointerTable`
    - added `searchFunctionPointerTable`

### Fix

* RefinedTypes
  - `RefinedString` now supports auto-conversion to a number

### Refactorings

* BasicTypes
  - the Booleanish module now uses the `FunctionPointerTable`
    - replaces its own, bespoke approach

## v0.1.6

Released Sunday, 21st June 2020.

### New

* Errors
  - added `NumberOutOfRangeError`
* Basic Types
  - added `validateNumberRange()`

### Refactor

* HttpStatusCode
  - now built on `validateNumberRange()`
* HttpStatusCodeError
  - now also an instance of `NumberOutOfRangeError`
  - now includes `minInc` and `maxInc` fields

## v0.1.5

Released Sunday, 21st June 2020.

### New

* BasicTypes
  * Filters (new module!)
    - added `Filter` function signature
    - added `everyFilter()` method
    - added `someFilters()` method
  * HashMaps
    - added `AnyHashMap`
  * Objects
    - added `getAllMethods()`
    - added `getAllMethodNames()`
    - added `getMissingMethodNames()`
    - added `getPublicMethods()`
    - added `getPublicMethodNames()`
    - added `isAttributeName()`
    - added `isGetterName()`
    - added `isMethodName()`
    - added `validateObjectHasAllMethodsCalled()`
    * Filters
      - added `PropertyFilter`
      - added `PropertyFilterData`
      - added `PropertyDescriptorFilterOptions`
      - added `PropertyDescriptorFilter`
      - added `PropertyDescriptorFilterData`
      - added `PropertyNameFilter`
      - added `PropertyNameFilterData`
      - added `PropertyNameFilterOptions`
      - added `FIND_PROPERTIES_FILTER_DROP_CONSTRUCTORS`
      - added `FIND_PROPERTIES_FILTER_DROP_INTERNAL`
      - added `FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES`
      - added `FIND_PROPERTIES_FILTER_KEEP_METHODS`
      - added `FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE`
      - added `FIND_PROPERTY_DESCRIPTORS_DEFAULT_OPTIONS`
      - added `FIND_PROPERTY_NAMES_DEFAULT_OPTIONS`
      - added `findAttributes()`
      - added `findAttributeNames()`
      - added `findMethods()`
      - added `findMethodNames()`
      - added `findProperties()`
      - added `findPropertyNames()`
  * Protocols
    - added `Has` protocol
  * Prototypes (new module!)
    - added `NextPrototypeChain`
    - added `NEXT_PROTOTYPE`
    - added `STOP_AT_NEXT_PROTOTYPE`
    - added `STOP_AT_OBJECT_PROTOTYPE`
* Errors
  - added `ExtensionDefinesNoMethodsError`
  - added `ObjectHasMissingMethodsError`
* ProtocolsExtensions (new module!)
  - added `ProtocolDefinition`
  - added `addExtension()`
  - added `implementsProtocol()`
  - added `makeProtocolDefinition()`
  - added `validateImplementsProtocol()`

## v0.1.4

Released Friday, 20th June 2020.

### Fixes

* SmartConstuctor
  - new generic parameter `FN_OPT` added

## v0.1.3

Released Friday, 19th June 2020.

### Fixes

* Resolve circular-dependency problems
  - only occurs when using `@safelytyped/core-types` in another package
* Errors
  - UnreachableCodeError
    - corrected the 'details' field
    - changed the 'status' field to be '500'

## v0.1.2

Released Friday, 19th June 2020.

### Fixes

* Basic Types
  - We now export basic types as part of the public API.

## v0.1.1

Released Thursday, 18th June 2020.

### Fixes

* Operators
  - we now export `IS_DATA_DEFAULT_OPTIONS`

## v0.1.0

Released Wednesday, 17th June 2020.

### New

* Archetypes
  * Entities
    - added `Entity` interface
    - added `EntityObject` base class
  * Function Types
    - added `DataGuarantee` function signature
    - added `DataGuard` function signature
    - added `DataValidator` function signature
    - added `FunctionalOption` function signature
    - added `SmartConstructor` function signature
    - added `TypeGuarantee` function signature
    - added `TypeGuard` function signature
    - added `TypeValidator` function signature
  * Nominals
    - added `AnyBranded` type
    - added `AnyFlavoured` type
    - added `AnyNominal` type
    - added `Branded` union type
    - added `Flavoured` type
    - added `makeNominalType()`
  * Values
    - added `AnyValue` type
    - added `isValue()` type guard
    - added `Value` protocol
    - added `ValueObject` base class
* BasicTypes
  * Any
    - added `isAny()` type guard
  * Arrays
    - added `isArray()` type guard
    - added `isNonEmptyArray()` type guard
    - added `mustBeArray()` type guarantee
    - added `NonEmptyArray` type
    - added `validateArray()` type validator
  * Booleanish
    - added `BooleanishDataOptions` type
    - added `BooleanishRules` type
    - added `isBooleanishData()` data validator
    - added `mustBeBooleanishData()` data guarantee
    - added `validateBooleanishBoolean()` data validator
    - added `validateBooleanishData()` data validator
    - added `validateBooleanishNumber()` data validator
    - added `validateBooleanishObject()` data validator
    - added `validateBooleanishString()` data validator
  * Booleans
    - added `isBoolean()` type guard
    - added `mustBeBoolean()` type guard
    - added `validateBoolean()` type validator
  * Classes
    - added `getClassNames()`
  * HashMaps
    - added `HashMap` interface
  * Integers
    - added `isInteger()` data guard
    - added `mustBeInteger()` data guarantee
    - added `validateInteger()` data validator
  * Numbers
    - added `isNumber()` type guard
    - added `mustBeNumber()` type guarantee
    - added `validateNumber()` type validator
  * Objects
    - added `isObject()` type guard
    - added `mustBeObject()` type guarantee
    - added `validateObject()` type validator
  * Strings
    - added `isString()` type guard
    - added `mustBeString()` type guarantee
    - added `validateString()` type validator
    - added `validateStringStartsWith()` data validator
  * Unknowns
    - added `getTypeNames()`
* ErrorHandling
  - added `AllExtraData` union type
  - added `AnyAppError` type
  - added `AnyExtraData` type
  - added `AppError` type
  - added `ExtraData` interface
  - added `ExtraLogsOnlyData` interface
  - added `ExtraPublicData` interface
  - added `NoExtraData` type
  - added `OnError` function signature
  - added `OnErrorOptions` option type
  - added `StructuredProblemReport` type
  - added `StructuredProblemReportData` type
  - added `THROW_THE_ERROR` default error handler
  - added `extractReasonFromCaught()` helper
  - added `extractStackFromCaught()` helper
  - added `isAppError()` type guard
  - added `makeStructuredProblemReport()` smart constructor
* Errors
  - added `MODULE_NAME` default
  - added `HttpStatusCodeOutOfRangeError`
  - added `InvalidNodeJSModuleNameError`
  - added `UnreachableCodeError`
  - added `UnsupportedBooleanishValueError`
  - added `UnsupportedStringPrefixError`
  - added `UnsupportedTypeError`
* Operators
  - added `isData()` operator
  - added `IsDataOptions` type
  - added `isType()` operator
  - added `IsTypeOptions` type
  - added `mustBe()` operator
  - added `MustBePipelineStep` type
  - added `recast()` operator
  - added `validate()` operator
  - added `ValidationPipelineStep` type
* OptionTypes
  - added `AppErrorOr` option type
* Protocols
  - added `Stack` protocol
  - added `implementsStack()` type guard
  - added `ToString` protocol
  - added `implementsToString()` type guard
  - added `implementsOwnOrInheritedToString()` type guard
* RefinedTypes
  - added `AnyPrimitiveType` type
  - added `AnyRefinedPrimitive` type
  - added `AnyRefinedNumber` type
  - added `AnyRefinedString` type
  - added `AnyRefinedType` type
  - added `RefinedNumber` type
  - added `RefinedPrimitive` type
  - added `RefinedString` type
  - added `RefinedType` type
* SupportingTypes
  * DataPath
    - added `DEFAULT_DATA_PATH`
    - added `DataPath` type
    - added `extendDataPath()`
    - added `isDataPathData()` data guard
    - added `makeDataPath()` smart constructor
    - added `mustBeDataPathData()` data guarantee
    - added `validateDataPathData()` data validator
  * HttpStatusCode
    - added `MAKE_HTTP_STATUS_CODE_DEFAULT_OPTIONS`
    - added `HttpStatusCode` type
    - added `isHttpStatusCodeData()` data guard
    - added `makeHttpStatusCode()` smart constructor
    - added `MakeHttpStatusCodeOptions` data type
    - added `mustBeHttpStatusCodeData()` data guard
    - added `validateHttpStatusCodeData()` data validator
  * NodeJSModuleName
    - added `MAKE_NODEJS_MODULE_NAME_DEFAULT_OPTIONS`
    - added `NodeJSModuleName` type
    - added `isNodeJSModuleNameData()` data guard
    - added `makeNodeJSModuleName()` smart constructor
    - added `MakeNodeJSModuleNameOptions` type
    - added `mustBeNodeJSModuleName()` data guarantee
    - added `validateNoteJSModuleNameData() data validator