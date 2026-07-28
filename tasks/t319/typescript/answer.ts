/**
 * Configuration structure for module evaluation rules
 */
interface Config {
    sections: string[];
    rules: Rule[];
}

/**
 * Rule structure defining keyword-module associations
 */
interface Rule {
    keywords: string[];
    sections: string[];
}

/**
 * Evaluate modules involved in a command based on external configuration to determine associations.
 *
 * @param command - Command string to be evaluated
 * @param config - Configuration object containing module definitions and judgment rules
 * @returns Results indicating whether each module is used ("yes"/"no")
 * @throws {TypeError} If command is not a string or config is not an object
 * @throws {Error} If config is missing required keys
 *
 * @example
 * const config: Config = {
 *   sections: ["network", "database", "ui"],
 *   rules: [{
 *     keywords: ["connect", "disconnect"],
 *     sections: ["network"]
 *   }]
 * };
 * evaluateCommand("connect to server", config);
 * // Returns: {'network': 'yes', 'database': 'no', 'ui': 'no'}
 */
function evaluateCommand(command: string, config: Config): Record<string, "yes" | "no"> {
    // Validate input parameters
    if (typeof command !== 'string') {
        throw new TypeError("command must be a string");
    }

    if (typeof config !== 'object' || config === null) {
        throw new TypeError("config must be an object");
    }

    if (!Array.isArray(config.sections) || !Array.isArray(config.rules)) {
        throw new Error("config must contain 'sections' and 'rules' arrays");
    }

    // Initialize result object with all modules defaulting to "no"
    const result: Record<string, "yes" | "no"> = {};
    config.sections.forEach(section => {
        result[section] = "no";
    });

    // Iterate through all rules to check if command matches keywords and update corresponding modules
    config.rules.forEach(rule => {
        // Validate rule structure
        if (typeof rule !== 'object' || rule === null ||
            !Array.isArray(rule.keywords) || !Array.isArray(rule.sections)) {
            return; // Skip invalid rules
        }

        // Check if command contains any keywords from the current rule (case-insensitive)
        const commandLower = command.toLowerCase();
        const hasKeyword = rule.keywords.some(keyword =>
            typeof keyword === 'string' && commandLower.includes(keyword.toLowerCase())
        );

        if (hasKeyword) {
            // Mark associated modules as "yes"
            rule.sections.forEach(section => {
                if (result.hasOwnProperty(section)) { // Ensure module is in predefined list
                    result[section] = "yes";
                }
            });
        }
    });

    return result;
}
// TEST CASE
describe('evaluateCommand', () => {
    let testConfig: Config;

    beforeEach(() => {
        // Set up test configuration for all test cases
        testConfig = {
            sections: ["network", "database", "ui", "security"],
            rules: [
                {
                    keywords: ["connect", "disconnect", "ping"],
                    sections: ["network"]
                },
                {
                    keywords: ["select", "insert", "update", "delete"],
                    sections: ["database"]
                },
                {
                    keywords: ["login", "logout", "password"],
                    sections: ["security", "ui"]
                },
                {
                    keywords: ["show", "display"],
                    sections: ["ui"]
                }
            ]
        };
    });

    test('normal keyword matching', () => {
        /** Test normal keyword matching functionality. */
        const command = "Connect to the database server";
        const result = evaluateCommand(command, testConfig);

        const expected: Record<string, "yes" | "no"> = {
            "network": "yes",    // 'connect' matches network rule
            "database": "no",    // no database keywords
            "ui": "no",          // no UI keywords
            "security": "no"     // no security keywords
        };

        expect(result).toEqual(expected);
    });

    test('multiple module activation', () => {
        /** Test that a single command can activate multiple modules. */
        const command = "User login with password verification";
        const result = evaluateCommand(command, testConfig);

        const expected: Record<string, "yes" | "no"> = {
            "network": "no",     // no network keywords
            "database": "no",    // no database keywords
            "ui": "yes",         // 'login' matches UI through security rule
            "security": "yes"    // 'login' and 'password' match security rule
        };

        expect(result).toEqual(expected);
    });

    test('case insensitive matching', () => {
        /** Test that keyword matching is case-insensitive. */
        const command = "SELECT * FROM users WHERE ID = 1";
        const result = evaluateCommand(command, testConfig);

        const expected: Record<string, "yes" | "no"> = {
            "network": "no",     // no network keywords
            "database": "yes",   // 'SELECT' matches database rule (case-insensitive)
            "ui": "no",          // no UI keywords
            "security": "no"     // no security keywords
        };

        expect(result).toEqual(expected);
    });

    test('no matching keywords', () => {
        /** Test behavior when no keywords match. */
        const command = "Calculate the sum of numbers";
        const result = evaluateCommand(command, testConfig);

        const expected: Record<string, "yes" | "no"> = {
            "network": "no",     // no matching keywords
            "database": "no",    // no matching keywords
            "ui": "no",          // no matching keywords
            "security": "no"     // no matching keywords
        };

        expect(result).toEqual(expected);
    });

    test('empty command', () => {
        /** Test behavior with empty command string. */
        const command = "";
        const result = evaluateCommand(command, testConfig);

        const expected: Record<string, "yes" | "no"> = {
            "network": "no",     // no matching keywords
            "database": "no",    // no matching keywords
            "ui": "no",          // no matching keywords
            "security": "no"     // no matching keywords
        };

        expect(result).toEqual(expected);
    });

    test('invalid input types', () => {
        /** Test error handling for invalid input types. */
        expect(() => {
            // @ts-ignore - Testing invalid input
            evaluateCommand(null, testConfig);
        }).toThrow(TypeError);

        expect(() => {
            // @ts-ignore - Testing invalid input
            evaluateCommand("test", null);
        }).toThrow(TypeError);
    });

    test('missing config keys', () => {
        /** Test error handling for missing configuration keys. */
        const invalidConfig = {
            sections: ["test"]
            // missing 'rules' key
        } as unknown as Config;

        expect(() => {
            // @ts-ignore - Testing invalid config structure
            evaluateCommand("test", invalidConfig);
        }).toThrow(Error);
    });

    test('partial keyword matching', () => {
        /** Test that partial keywords are matched correctly. */
        const command = "reconnect to server";
        const result = evaluateCommand(command, testConfig);

        // 'connect' is part of 'reconnect', so should match
        expect(result.network).toBe("yes");
    });
});