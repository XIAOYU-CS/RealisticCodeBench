# Task Standard Format

This document describes the observed standard format for tasks under
`final_realistic_code_bench/tasks`.

## Directory Layout

Each task directory is named with the mapped new task id:

```text
tasks/t<new_task_id>/
```

Example:

```text
tasks/t1/
tasks/t299/
tasks/t376/
```

Each task should contain one root source file and one directory per supported
language.

```text
t<id>/
  origin.* | Original.java
  python/
  javascript/
  typescript/
  java/
  c&cpp/
```

Root source file names are normalized by language:

- `origin.py`, `origin.js`, `origin.ts`, `origin.c`, `origin.cpp`
- `Original.java` for Java, because Java public class names require the
  matching uppercase file name.

Exactly one root source/origin file is expected per task.

## Language File Sets

### Python

Expected files:

```text
python/
  signature.py
  answer.py | adapted.py
  test.py
```

Observed format:

- `signature.py` usually contains imports plus a function signature and a
  triple-quoted docstring.
- Common imports include `typing`, `numpy`, `re`, `math`, `os`, and `pandas`.
- Implementation is usually `answer.py` for pure numeric source tasks and
  `adapted.py` for split-id source tasks.
- `answer.py` / `adapted.py` often include docstrings and inline comments.
- Tests are usually `unittest` based, with `class ... (unittest.TestCase)` and
  methods named `test_*`.

Naming:

- Functions are normally `snake_case`.
- Classes are normally `PascalCase`.
- Test methods are `test_*`.

Example mapping:

```text
Python: numerical_str_convert
```

### JavaScript

Expected files:

```text
javascript/
  signature.js
  answer.js | adapted.js
  test.js
```

Observed format:

- `signature.js` usually contains a JSDoc block and an empty function body.
- JSDoc uses `@param` and `@returns`.
- Implementation is usually a plain named function.
- Common imports use CommonJS, for example `const fs = require('fs');` and
  `const path = require('path');`; a small number use ESM imports.
- `answer.js` / `adapted.js` often include comments, mostly `//` and sometimes
  JSDoc blocks.
- Tests are usually Jest style: `describe(...)`, `it(...)` or `test(...)`, and
  `expect(...)`.

Naming:

- Functions are normally `camelCase`.
- Classes are normally `PascalCase`.

Example mapping:

```text
JavaScript: numericalStrConvert
```

### TypeScript

Expected files:

```text
typescript/
  signature.ts
  answer.ts | adapted.ts
  test.ts
```

Observed format:

- `signature.ts` is similar to JavaScript but includes TypeScript types.
- JSDoc-style comments are common.
- Common imports include `fs`, `path`, `os`, `mathjs`, and CSV/XML/PDF helpers
  in task-specific files.
- Implementation usually defines a typed named function.
- A few files use `export`, but most implementations are plain top-level
  functions.
- Tests are usually Jest style: `describe(...)`, `it(...)` or `test(...)`, and
  `expect(...)`.

Naming:

- Functions are normally `camelCase`.
- Classes and interfaces are normally `PascalCase`.

Example mapping:

```text
TypeScript: numericalStrConvert
```

### Java

Expected files:

```text
java/
  Signature.java
  Answer.java
  Tester.java
```

Observed format:

- `Signature.java` usually contains Javadoc plus the target static method
  signature. It is often not a complete class file.
- `Answer.java` usually contains:

```java
package org.real.temp;

public class Answer {
    public static ... methodName(...) {
        ...
    }
}
```

- `Tester.java` usually contains:

```java
package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

public class Tester {
    @Test
    public void testSomething() {
        ...
    }
}
```

- Common implementation imports include `java.util.List`,
  `java.util.ArrayList`, `java.util.*`, `java.util.regex.*`, and `java.io.*`.
- Tests are usually JUnit4 with `@Test`, `org.junit.Test`, and `Assert`.
- Some tests statically import `org.real.temp.Answer.*`.

Naming:

- File names are case-sensitive by convention: `Answer.java`,
  `Signature.java`, `Tester.java`.
- Main class names are `PascalCase`: `Answer`, `Tester`.
- Methods are normally `camelCase`.
- Test methods are normally `testSomething` style.

Example mapping:

```text
Java: numericalStrConvert
```

### C/C++

Expected files:

```text
c&cpp/
  signature.cpp
  answer.cpp
  test.cpp
```

Observed format:

- `signature.cpp` usually contains a Doxygen-style block comment and a function
  prototype.
- Doxygen comments commonly use `@brief`, `@param`, `@return`, and sometimes
  `@exception`.
- `answer.cpp` contains a free function implementation.
- Common includes are `iostream`, `string`, `vector`, `stdexcept`, `sstream`,
  `algorithm`, `regex`, `cmath`, `map`, and `fstream`.
- Comments in implementation are mostly `//`; block comments are less common.
- Tests are usually Catch2 style: `TEST_CASE`, `SECTION`, `REQUIRE`, and
  sometimes `CHECK`.
- Most `test.cpp` files do not include `#include <catch2/catch.hpp>` directly.

Naming:

- Functions are often `snake_case`, especially when mirroring Python.
- Some tasks use `camelCase`; use `signature.cpp` as the source of truth.
- Classes and structs are usually `PascalCase`, but task-specific C/C++ types
  can also use lower-case system-style names.

Example mapping:

```text
C/C++: numerical_str_convert
```

## Cross-Language Naming Rule

The same logical function usually follows each language's naming convention.

```text
Python / C/C++: numerical_str_convert
JavaScript / TypeScript / Java: numericalStrConvert
```

Do not force one global function name across all languages. For each language,
the function name in the implementation and tests must match that language's
`signature` file.

## Consistency Rules

For a task to be considered internally consistent:

1. The task root contains exactly one source/origin file.
2. Each existing language directory contains its expected signature,
   implementation, and test files.
3. The implementation function name matches the language-specific signature.
4. The tests call the same function name as the implementation.
5. Java keeps file and class names aligned:
   `Answer.java` -> `class Answer`,
   `Signature.java` -> signature declarations,
   `Tester.java` -> `class Tester`.
6. Python and C/C++ commonly use `snake_case`; JavaScript, TypeScript, and Java
   commonly use `camelCase`.

Known incomplete tasks are recorded separately in `task_file_check.json`.
