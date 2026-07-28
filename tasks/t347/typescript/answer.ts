/**
 * Pattern with weight for language detection
 */
type LanguagePattern = [RegExp, number];

/**
 * Detects the programming language of the given code snippet based on syntax features.
 *
 * @param code - The source code to analyze
 * @returns The detected language ('python', 'java', 'javascript', 'c++', or 'unknown')
 */
function detectLanguage(code: string): string {
    // Preprocessing: Remove leading/trailing whitespace
    const codeClean: string = code.trim();

    // Python patterns with weights
    const pythonPatterns: LanguagePattern[] = [
        [/^[ \t]+def /gm, 2],           // Indented function definition
        [/^[ \t]+class /gm, 2],         // Indented class definition
        [/\bprint\s*\([^)]*\)/, 1],     // print function
        [/\bimport\s+\w+/, 1],          // import statement
        [/\bfrom\s+\w+\s+import/, 1],   // from...import
        [/\bdef\b/, 1],                 // def keyword
        [/\bself\b/, 1],                // self keyword
        [/#.*$/gm, 1]                   // comment
    ];

    // C++ patterns with weights
    const cppPatterns: LanguagePattern[] = [
        [/#include\s*[<"][^>"]*[>"]/, 2],   // include directive
        [/cout\s*<</, 1],                   // cout
        [/using\s+namespace\s+\w+/, 1],     // namespace
        [/\w+::\w+/, 1],                    // scope resolution operator
        [/\bstd\b/, 1]                      // std namespace
    ];

    // Java patterns with weights
    const javaPatterns: LanguagePattern[] = [
        [/public\s+class\s+\w+/, 2],                    // public class
        [/\bextends\s+\w+/, 1],                         // inheritance
        [/\b(public|private|protected)\b/, 1],          // access modifiers
        [/\bvoid\b/, 1],                                // void return type
        [/System\.out\.println/i, 1]                    // print statement
    ];

    // JavaScript patterns with weights
    const jsPatterns: LanguagePattern[] = [
        [/\b(var|let|const)\s+\w+/, 2],     // variable declaration
        [/function\s+\w*\s*\(/, 1],         // function definition
        [/console\.log\s*\(/, 1],           // log function
        [/=>/, 1],                          // arrow function
        [/\binstanceof\b/, 1],              // instanceof operator
        [/\bthis\b/, 1]                     // this keyword
    ];

    // Scoring function
    function scoreLanguage(patterns: LanguagePattern[]): number {
        let score: number = 0;
        for (const [pattern, weight] of patterns) {
            if (pattern.test(codeClean)) {
                score += weight;
            }
        }
        return score;
    }

    // Calculate scores
    const scores: Record<string, number> = {
        'python': scoreLanguage(pythonPatterns),
        'c++': scoreLanguage(cppPatterns),
        'java': scoreLanguage(javaPatterns),
        'javascript': scoreLanguage(jsPatterns),
        'unknown': 0
    };

    // Remove unknown from scoring consideration
    delete scores.unknown;

    // Find the language with the highest score
    const maxScore: number = Math.max(...Object.values(scores));

    // If highest score is 0, return unknown
    if (maxScore === 0) {
        return 'unknown';
    }

    // Return the language with the highest score
    for (const [lang, score] of Object.entries(scores)) {
        if (score === maxScore) {
            return lang as string;
        }
    }

    // Fallback (should never reach here)
    return 'unknown';
}