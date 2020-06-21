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
      - added `FIND_PROPERTIES_FILTER_KEEP_ATTRIBUTES`
      - added `FIND_PROPERTIES_FILTER_KEEP_METHODS`
      - added `FIND_PROPERTIES_FILTER_PREFER_CHILD_PROTOTYPE`
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
    - added `STOP_AT_OBJECT_PROTOTYPE`
* Errors
  - added `ExtensionDefinesNoMethodsError`
  - added `ObjectHasMissingMethodsError`
* ProtocolsExtensions (new module!)
  - added `ProtocolDefinition`
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