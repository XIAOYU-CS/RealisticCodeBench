import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('processCppFile', () => {
    let tempDir: string;
    let testDir: string;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
        testDir = tempDir;
    });

    afterEach(() => {
        if (tempDir && fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    test('normal processing with includes', () => {
        const inputFile = path.join(testDir, "input.c");
        const inputContent = `#include <stdio.h>
#include <stdlib.h>
int main() {
    ti_init();
    ti_process_data();
    return 0;
}`;

        fs.writeFileSync(inputFile, inputContent, 'utf8');

        const outputFile = path.join(testDir, "output.c");
        processCppFile(inputFile, outputFile, "#define DEBUG 1", "ti_");

        const outputContent = fs.readFileSync(outputFile, 'utf8');

        const expectedContent = `#include <stdio.h>
#include <stdlib.h>
#define DEBUG 1
int main() {
    CALL_C_API_FUNC(ti_init)();
    CALL_C_API_FUNC(ti_process_data)();
    return 0;
}`;

        expect(outputContent.trim()).toBe(expectedContent.trim());
    });

    test('function replacement with underscores', () => {
        const inputFile = path.join(testDir, "input2.c");
        const inputContent = `#include <test.h>
void test() {
    my_func_test();
    my_func_helper_data();
}`;
        fs.writeFileSync(inputFile, inputContent, 'utf8');
        const outputFile = path.join(testDir, "output2.c");
        processCppFile(inputFile, outputFile, "#define MAX 100", "my_func_", "#include");
        const outputContent = fs.readFileSync(outputFile, 'utf8');
        const expectedContent = `#include <test.h>
#define MAX 100
void test() {
    CALL_C_API_FUNC(my_func_test)();
    CALL_C_API_FUNC(my_func_helper_data)();
}`;
        expect(outputContent.trim()).toBe(expectedContent.trim());
    });

    test('no include statements', () => {
        const inputFile = path.join(testDir, "input3.c");
        const inputContent = `int main() {
    test_func();
    another_func_call();
    return 0;
}`;
        fs.writeFileSync(inputFile, inputContent, 'utf8');
        const outputFile = path.join(testDir, "output3.c");
        processCppFile(inputFile, outputFile, "// Custom comment", "test_");
        const outputContent = fs.readFileSync(outputFile, 'utf8');
        const expectedContent = `// Custom comment
int main() {
    CALL_C_API_FUNC(test_func)();
    another_func_call();
    return 0;
}`;
        expect(outputContent.trim()).toBe(expectedContent.trim());
    });

    test('custom include keyword', () => {
        const inputFile = path.join(testDir, "input4.c");
        const inputContent = `// Import section
// Import module1
int main() {
    custom_init();
    custom_cleanup();
}`;

        fs.writeFileSync(inputFile, inputContent, 'utf8');
        const outputFile = path.join(testDir, "output4.c");
        processCppFile(inputFile, outputFile, "#define VERSION 1.0", "custom_", "// Import");
        const outputContent = fs.readFileSync(outputFile, 'utf8');
        const expectedContent = `// Import section
// Import module1
#define VERSION 1.0
int main() {
    CALL_C_API_FUNC(custom_init)();
    CALL_C_API_FUNC(custom_cleanup)();
}`;

        expect(outputContent.trim()).toBe(expectedContent.trim());
    });


    test('no matching prefix', () => {
        // Create input file
        const inputFile = path.join(testDir, "input6.c");
        const inputContent = `int main() {
    func_one();
    func_two();
    return 0;
}`;

        fs.writeFileSync(inputFile, inputContent, 'utf8');

        const outputFile = path.join(testDir, "output6.c");
        processCppFile(inputFile, outputFile, "// No match test", "test_");
        const outputContent = fs.readFileSync(outputFile, 'utf8');
        const expectedContent = `// No match test
int main() {
    func_one();
    func_two();
    return 0;
}`;

        expect(outputContent.trim()).toBe(expectedContent.trim());
    });
});