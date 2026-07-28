TEST_CASE("Test detection of Python code", "[detect_language]") {
    std::string python_code = R"(
def hello_world():
    print("Hello, World!")
    return True

class MyClass:
    def __init__(self):
        self.value = 42

import os
from typing import List
)";
    REQUIRE(detect_language(python_code) == "python");
}

TEST_CASE("Test detection of Java code", "[detect_language]") {
    std::string java_code = R"(
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }

    private void myMethod() {
        System.out.println("This is Java");
    }
}
)";
    REQUIRE(detect_language(java_code) == "java");
}

TEST_CASE("Test detection of JavaScript code", "[detect_language]") {
    std::string js_code = R"(
const helloWorld = () => {
    console.log("Hello, World!");
    return true;
};

let myVariable = 42;
var oldStyle = "deprecated";

function myFunction() {
    console.log(this.value);
}
)";
    REQUIRE(detect_language(js_code) == "javascript");
}

TEST_CASE("Test detection of C++ code", "[detect_language]") {
    std::string cpp_code = R"(
#include <iostream>
#include "myheader.h"

using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}

class MyClass {
public:
    void myMethod() {
        std::cout << "This is C++" << std::endl;
    }
};
)";
    REQUIRE(detect_language(cpp_code) == "c++");
}

TEST_CASE("Test detection of unknown/unrecognized code", "[detect_language]") {
    std::string unknown_code = R"(
This is just plain text.
It doesn't look like any programming language.
Maybe it's a configuration file or documentation.
)";
    REQUIRE(detect_language(unknown_code) == "unknown");
}
