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
function evaluateCommand(command: string, config: Config): Record<string, "yes" | "no"> {}