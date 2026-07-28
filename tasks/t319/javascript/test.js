describe('evaluateCommand', () => {
    let testConfig;

    beforeEach(() => {
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
        const command = "Connect to the database server";
        const result = evaluateCommand(command, testConfig);

        const expected = {
            "network": "yes", 
            "database": "no",
            "ui": "no",
            "security": "no"
        };

        expect(result).toEqual(expected);
    });

    test('multiple module activation', () => {
        const command = "User login with password verification";
        const result = evaluateCommand(command, testConfig);

        const expected = {
            "network": "no", 
            "database": "no",
            "ui": "yes", 
            "security": "yes"
        };

        expect(result).toEqual(expected);
    });

    test('case insensitive matching', () => {
        const command = "SELECT * FROM users WHERE ID = 1";
        const result = evaluateCommand(command, testConfig);

        const expected = {
            "network": "no",  
            "database": "yes",
            "ui": "no",
            "security": "no"
        };

        expect(result).toEqual(expected);
    });

    test('no matching keywords', () => {
        const command = "Calculate the sum of numbers";
        const result = evaluateCommand(command, testConfig);

        const expected = {
            "network": "no",   
            "database": "no",  
            "ui": "no",      
            "security": "no"
        };

        expect(result).toEqual(expected);
    });

    test('empty command', () => {
        const command = "";
        const result = evaluateCommand(command, testConfig);

        const expected = {
            "network": "no",     
            "database": "no", 
            "ui": "no",        
            "security": "no" 
        };

        expect(result).toEqual(expected);
    });

    test('invalid input types', () => {
        expect(() => {
            evaluateCommand(null, testConfig);
        }).toThrow();

        expect(() => {
            evaluateCommand("test", null);
        }).toThrow();

        expect(() => {
            evaluateCommand("test", {});
        }).toThrow();
    });

    test('missing config keys', () => {
        const invalidConfig = {
            sections: ["test"]
        };

        expect(() => {
            evaluateCommand("test", invalidConfig);
        }).toThrow();
    });

    test('partial keyword matching', () => {
        const command = "reconnect to server";
        const result = evaluateCommand(command, testConfig);

        expect(result.network).toBe("yes");
    });
});