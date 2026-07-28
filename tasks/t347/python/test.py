import unittest


class TestDetectLanguage(unittest.TestCase):

    def test_detect_python(self):
        python_code = """
def hello_world():
    print("Hello, World!")
    return True

class MyClass:
    def __init__(self):
        self.value = 42

import os
from typing import List
"""
        result = detect_language(python_code)
        self.assertEqual(result, 'python')

    def test_detect_java(self):
        java_code = """
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }

    private void myMethod() {
        System.out.println("This is Java");
    }
}
"""
        result = detect_language(java_code)
        self.assertEqual(result, 'java')

    def test_detect_javascript(self):
        js_code = """
const helloWorld = () => {
    console.log("Hello, World!");
    return true;
};

let myVariable = 42;
var oldStyle = "deprecated";

function myFunction() {
    console.log(this.value);
}
"""
        result = detect_language(js_code)
        self.assertEqual(result, 'javascript')

    def test_detect_cpp(self):
        cpp_code = """
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
"""
        result = detect_language(cpp_code)
        self.assertEqual(result, 'c++')

    def test_detect_unknown(self):
        unknown_code = """
This is just plain text.
It doesn't look like any programming language.
Maybe it's a configuration file or documentation.
"""
        result = detect_language(unknown_code)
        self.assertEqual(result, 'unknown')