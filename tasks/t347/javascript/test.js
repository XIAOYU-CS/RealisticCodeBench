describe('detectLanguage', () => {
    test('should detect Python code correctly', () => {
        const pythonCode = `
def hello_world():
    print("Hello, World!")
    return True

class MyClass:
    def __init__(self):
        self.value = 42

import os
from typing import List
`;
        const result = detectLanguage(pythonCode);
        expect(result).toBe('python');
    });

    test('should detect Java code correctly', () => {
        const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    
    private void myMethod() {
        System.out.println("This is Java");
    }
}
`;
        const result = detectLanguage(javaCode);
        expect(result).toBe('java');
    });

    test('should detect JavaScript code correctly', () => {
        const jsCode = `
const helloWorld = () => {
    console.log("Hello, World!");
    return true;
};

let myVariable = 42;
var oldStyle = "deprecated";

function myFunction() {
    console.log(this.value);
}
`;
        const result = detectLanguage(jsCode);
        expect(result).toBe('javascript');
    });

    test('should detect C++ code correctly', () => {
        const cppCode = `
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
`;
        const result = detectLanguage(cppCode);
        expect(result).toBe('c++');
    });

    test('should return unknown for unrecognized code', () => {
        const unknownCode = `
This is just plain text.
It doesn't look like any programming language.
Maybe it's a configuration file or documentation.
`;
        const result = detectLanguage(unknownCode);
        expect(result).toBe('unknown');
    });

    test('should handle edge cases', () => {
        expect(detectLanguage('')).toBe('unknown');
        expect(detectLanguage('   \n\t  ')).toBe('unknown');
        expect(detectLanguage('x = 1')).toBe('unknown');
    });

    test('should handle ambiguous cases reasonably', () => {
        const ambiguousCode = `
function test() {
    console.log("This could be JavaScript");
    var x = 10;
}
`;
        const result = detectLanguage(ambiguousCode);
        expect(['javascript', 'unknown']).toContain(result);
    });
});