import unittest
import tempfile
from pathlib import Path


class TestProcessCppFile(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.test_dir = Path(self.temp_dir.name)

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_normal_processing_with_includes(self):
        # Create input file
        input_file = self.test_dir / "input.c"
        input_content = """#include <stdio.h>
#include <stdlib.h>
int main() {
    ti_init();
    ti_process_data();
    return 0;
}"""

        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(input_content)

        output_file = self.test_dir / "output.c"
        process_cpp_file(str(input_file), str(output_file), "#define DEBUG 1", "ti_")

        with open(output_file, 'r', encoding='utf-8') as f:
            output_content = f.read()

        expected_content = """#include <stdio.h>
#include <stdlib.h>
#define DEBUG 1
int main() {
    CALL_C_API_FUNC(ti_init)();
    CALL_C_API_FUNC(ti_process_data)();
    return 0;
}"""

        self.assertEqual(output_content.strip(), expected_content.strip())

    def test_function_replacement_with_underscores(self):
        input_file = self.test_dir / "input2.c"
        input_content = """#include <test.h>
void test() {
    my_func_test();
    my_func_helper_data();
}"""

        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(input_content)

        output_file = self.test_dir / "output2.c"
        process_cpp_file(str(input_file), str(output_file), "#define MAX 100", "my_func_", "#include")

        with open(output_file, 'r', encoding='utf-8') as f:
            output_content = f.read()

        expected_content = """#include <test.h>
#define MAX 100
void test() {
    CALL_C_API_FUNC(my_func_test)();
    CALL_C_API_FUNC(my_func_helper_data)();
}"""

        self.assertEqual(output_content.strip(), expected_content.strip())

    def test_no_include_statements(self):
        input_file = self.test_dir / "input3.c"
        input_content = """int main() {
    test_func();
    another_func_call();
    return 0;
}"""

        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(input_content)

        output_file = self.test_dir / "output3.c"
        process_cpp_file(str(input_file), str(output_file), "// Custom comment", "test_")

        with open(output_file, 'r', encoding='utf-8') as f:
            output_content = f.read()

        expected_content = """// Custom comment
int main() {
    CALL_C_API_FUNC(test_func)();
    another_func_call();
    return 0;
}"""

        self.assertEqual(output_content.strip(), expected_content.strip())

    def test_custom_include_keyword(self):
        input_file = self.test_dir / "input4.c"
        input_content = """// Import section
// Import module1
int main() {
    custom_init();
    custom_cleanup();
}"""

        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(input_content)

        output_file = self.test_dir / "output4.c"
        process_cpp_file(str(input_file), str(output_file), "#define VERSION 1.0", "custom_", "// Import")

        # Check output
        with open(output_file, 'r', encoding='utf-8') as f:
            output_content = f.read()

        expected_content = """// Import section
// Import module1
#define VERSION 1.0
int main() {
    CALL_C_API_FUNC(custom_init)();
    CALL_C_API_FUNC(custom_cleanup)();
}"""

        self.assertEqual(output_content.strip(), expected_content.strip())

    def test_empty_file(self):
        input_file = self.test_dir / "input5.c"
        with open(input_file, 'w', encoding='utf-8') as f:
            f.write("")

        output_file = self.test_dir / "output5.c"
        process_cpp_file(str(input_file), str(output_file), "#define EMPTY_TEST", "test_")
        with open(output_file, 'r', encoding='utf-8') as f:
            output_content = f.read()
        expected_content = "#define EMPTY_TEST\n"
        self.assertEqual(output_content, expected_content)

    def test_no_matching_prefix(self):
        input_file = self.test_dir / "input6.c"
        input_content = """int main() {
    func_one();
    func_two();
    return 0;
}"""
        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(input_content)
        output_file = self.test_dir / "output6.c"
        process_cpp_file(str(input_file), str(output_file), "// No match test", "test_")
        with open(output_file, 'r', encoding='utf-8') as f:
            output_content = f.read()
        expected_content = """// No match test
int main() {
    func_one();
    func_two();
    return 0;
}"""
        self.assertEqual(output_content.strip(), expected_content.strip())