package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testDetectPython() {
        String pythonCode = "def hello_world():\n" +
                "    print(\"Hello, World!\")\n" +
                "    return True\n" +
                "\n" +
                "class MyClass:\n" +
                "    def __init__(self):\n" +
                "        self.value = 42\n" +
                "\n" +
                "import os\n" +
                "from typing import List\n";
        String result = Answer.detectLanguage(pythonCode);
        assertEquals("python", result);
    }

    @Test
    public void testDetectJava() {
        String javaCode = "public class HelloWorld {\n" +
                "    public static void main(String[] args) {\n" +
                "        System.out.println(\"Hello, World!\");\n" +
                "    }\n" +
                "\n" +
                "    private void myMethod() {\n" +
                "        System.out.println(\"This is Java\");\n" +
                "    }\n" +
                "}\n";
        String result = Answer.detectLanguage(javaCode);
        assertEquals("java", result);
    }

    @Test
    public void testDetectJavascript() {
        String jsCode = "const helloWorld = () => {\n" +
                "    console.log(\"Hello, World!\");\n" +
                "    return true;\n" +
                "};\n" +
                "\n" +
                "let myVariable = 42;\n" +
                "var oldStyle = \"deprecated\";\n" +
                "\n" +
                "function myFunction() {\n" +
                "    console.log(this.value);\n" +
                "}\n";
        String result = Answer.detectLanguage(jsCode);
        assertEquals("javascript", result);
    }

    @Test
    public void testDetectCpp() {
        String cppCode = "#include <iostream>\n" +
                "#include \"myheader.h\"\n" +
                "\n" +
                "using namespace std;\n" +
                "\n" +
                "int main() {\n" +
                "    cout << \"Hello, World!\" << endl;\n" +
                "    return 0;\n" +
                "}\n" +
                "\n" +
                "class MyClass {\n" +
                "public:\n" +
                "    void myMethod() {\n" +
                "        std::cout << \"This is C++\" << std::endl;\n" +
                "    }\n" +
                "};\n";
        String result = Answer.detectLanguage(cppCode);
        assertEquals("c++", result);
    }

    @Test
    public void testDetectUnknown() {
        String unknownCode = "This is just plain text.\n" +
                "It doesn't look like any programming language.\n" +
                "Maybe it's a configuration file or documentation.\n";
        String result = Answer.detectLanguage(unknownCode);
        assertEquals("unknown", result);
    }
}