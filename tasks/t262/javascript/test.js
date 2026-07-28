const fsJsonTest = require("fs");

describe("parseJsonFile", () => {
    const files = [
        "temp_valid.json",
        "temp_empty.json",
        "temp_not_json.txt",
        "temp_array.json",
    ];

    afterEach(() => {
        for (const file of files) {
            if (fsJsonTest.existsSync(file)) {
                fsJsonTest.unlinkSync(file);
            }
        }
    });

    test("valid json", () => {
        fsJsonTest.writeFileSync("temp_valid.json", "{\"name\":\"John\", \"age\":30}");
        const result = parseJsonFile("temp_valid.json");
        expect(result.name).toBe("John");
        expect(result.age).toBe(30);
    });

    test("empty json", () => {
        fsJsonTest.writeFileSync("temp_empty.json", "{}");
        expect(parseJsonFile("temp_empty.json")).toEqual({});
    });

    test("null input", () => {
        expect(() => parseJsonFile(null)).toThrow();
    });

    test("non-json file", () => {
        fsJsonTest.writeFileSync("temp_not_json.txt", "Hello, World!");
        expect(() => parseJsonFile("temp_not_json.txt")).toThrow();
    });

    test("json with array", () => {
        fsJsonTest.writeFileSync("temp_array.json", "{\"names\":[\"John\", \"Doe\"]}");
        expect(parseJsonFile("temp_array.json").names).toBeDefined();
    });
});
