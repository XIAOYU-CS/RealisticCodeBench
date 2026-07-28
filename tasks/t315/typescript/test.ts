describe('replaceTextWithConfig', () => {
    let testDir: string;

    beforeEach(() => {
        testDir = fs.mkdtempSync(path.join(__dirname, 'test-'));
    });

    afterEach(() => {
        if (testDir && fs.existsSync(testDir)) {
            const files = fs.readdirSync(testDir);
            files.forEach(file => {
                fs.unlinkSync(path.join(testDir, file));
            });
            fs.rmdirSync(testDir);
        }
    });

    function createConfigFile(configData: Config, filename: string = 'config.json'): string {
        const configPath = path.join(testDir, filename);
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf8');
        return configPath;
    }

    test('exact string replacement', () => {
        const config: Config = {
            replacements: [
                { pattern: "hello", replacement: "hi" },
                { pattern: "world", replacement: "universe" }
            ]
        };
        const configPath = createConfigFile(config);

        const inputText = "hello world, hello everyone";
        const expected = "hi universe, hi everyone";

        const result = replaceTextWithConfig(inputText, configPath);
        expect(result).toBe(expected);
    });

    test('regex replacement', () => {
        const config: Config = {
            replacements: [
                { pattern: "\\d+", replacement: "NUMBER" },
                { pattern: "[aeiou]", replacement: "*" }
            ]
        };
        const configPath = createConfigFile(config);

        const inputText = "hello 123 world 456";
        const expected = "h*ll* NUMBER w*rld NUMBER";

        const result = replaceTextWithConfig(inputText, configPath, true);
        expect(result).toBe(expected);
    });

    test('file not found error', () => {
        expect(() => {
            replaceTextWithConfig("test text", "/non/existent/file.json");
        }).toThrow();
    });

    test('invalid json config', () => {
        const invalidConfigPath = path.join(testDir, "invalid_config.json");
        fs.writeFileSync(invalidConfigPath, "{ invalid json content }", 'utf8');

        expect(() => {
            replaceTextWithConfig("test text", invalidConfigPath);
        }).toThrow('Invalid JSON in configuration file');
    });

    test('missing replacements key', () => {
        const config = {
            wrong_key: [
                { pattern: "test", replacement: "replacement" }
            ]
        } as unknown as Config;
        const configPath = createConfigFile(config);

        expect(() => {
            replaceTextWithConfig("test text", configPath);
        }).toThrow("Configuration file must contain a 'replacements' key");
    });

    test('invalid regex pattern', () => {
        const config: Config = {
            replacements: [
                { pattern: "[", replacement: "invalid" }
            ]
        };
        const configPath = createConfigFile(config);

        expect(() => {
            replaceTextWithConfig("test text", configPath, true);
        }).toThrow('Invalid regular expression');
    });

    test('handles special characters in exact string replacement', () => {
        const config: Config = {
            replacements: [
                { pattern: "hello?", replacement: "hi" },
                { pattern: "test*", replacement: "done" }
            ]
        };
        const configPath = createConfigFile(config);

        const inputText = "hello? world test* here";
        const expected = "hi world done here";

        const result = replaceTextWithConfig(inputText, configPath);
        expect(result).toBe(expected);
    });

    test('skips invalid rules', () => {
        const config: Config = {
            replacements: [
                { pattern: "valid", replacement: "good" },
                { invalid: "rule" } as unknown as { pattern: string; replacement: string },
                null as unknown as { pattern: string; replacement: string },
                { pattern: "another", replacement: "great" }
            ]
        };
        const configPath = createConfigFile(config);

        const inputText = "valid text another text";
        const expected = "good text great text";

        const result = replaceTextWithConfig(inputText, configPath);
        expect(result).toBe(expected);
    });
});