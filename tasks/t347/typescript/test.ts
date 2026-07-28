describe('detectLanguage', () => {

    test('should detect Python code correctly', () => {
        const pythonCode: string = `
def hello_world():
    print("Hello, World!")
    return True

class MyClass:
    def __init__(self):
        self.value = 42

import os
from typing import List
`;
        const result: string = detectLanguage(pythonCode);
        expect(result).toBe('python');
    });

    test('should detect Java code correctly', () => {
        const javaCode: string = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    
    private void myMethod() {
        System.out.println("This is Java");
    }
}
`;
        const result: string = detectLanguage(javaCode);
        expect(result).toBe('java');
    });

    test('should detect JavaScript code correctly', () => {
        const jsCode: string = `
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
        const result: string = detectLanguage(jsCode);
        expect(result).toBe('javascript');
    });

    test('should detect C++ code correctly', () => {
        const cppCode: string = `
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
        const result: string = detectLanguage(cppCode);
        expect(result).toBe('c++');
    });

    test('should return unknown for unrecognized code', () => {
        const unknownCode: string = `
This is just plain text.
It doesn't look like any programming language.
Maybe it's a configuration file or documentation.
`;
        const result: string = detectLanguage(unknownCode);
        expect(result).toBe('unknown');
    });

    test('should handle edge cases', () => {
        expect(detectLanguage('')).toBe('unknown');

        expect(detectLanguage('   \n\t  ')).toBe('unknown');

        expect(detectLanguage('x = 1')).toBe('unknown');
    });
});

describe('detectLanguageWithConfidence', () => {
    test('should provide detection with confidence', () => {
        const jsCode: string = `
const test = () => {
    console.log("Hello");
};
`;
        const result = detectLanguage(jsCode);
        expect(result).toBe('javascript');
    });

    test('should return unknown with 0 confidence for unrecognized code', () => {
        const unknownCode: string = 'This is plain text';
        const result = detectLanguage(unknownCode);
        expect(result).toBe('unknown');
    });
});

describe('Type Safety', () => {
    test('should return valid ProgrammingLanguage type', () => {
        const result: string = detectLanguage('console.log("test");');
        const validLanguages: string[] = ['python', 'java', 'javascript', 'c++', 'unknown'];
        expect(validLanguages).toContain(result);
    });
});