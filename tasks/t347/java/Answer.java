package org.real.temp;

import java.util.regex.Pattern;

public class Answer {
    /**
     * Detects the programming language of the given code snippet based on syntax features.
     *
     * @param code The source code to analyze.
     * @return The detected language ("python", "java", "javascript", "c++", or "unknown").
     */
    public static String detectLanguage(String code) {
        String codeClean = code.strip();

        Pattern[][] pythonPatterns = {
            {Pattern.compile("^[ \\t]+def ", Pattern.MULTILINE), Pattern.compile("2")},
            {Pattern.compile("^[ \\t]+class ", Pattern.MULTILINE), Pattern.compile("2")},
            {Pattern.compile("\\bprint\\s*\\([^)]*\\)"), Pattern.compile("1")},
            {Pattern.compile("\\bimport\\s+\\w+"), Pattern.compile("1")},
            {Pattern.compile("\\bfrom\\s+\\w+\\s+import"), Pattern.compile("1")},
            {Pattern.compile("\\bdef\\b"), Pattern.compile("1")},
            {Pattern.compile("\\bself\\b"), Pattern.compile("1")},
            {Pattern.compile("#[^\\n]*$", Pattern.MULTILINE), Pattern.compile("1")}
        };

        // C++ patterns
        Pattern[][] cppPatterns = {
            {Pattern.compile("#include\\s*[<\"][^>\"]*[>\"]"), Pattern.compile("2")},
            {Pattern.compile("cout\\s*<<"), Pattern.compile("1")},
            {Pattern.compile("using\\s+namespace\\s+\\w+"), Pattern.compile("1")},
            {Pattern.compile("\\w+::\\w+"), Pattern.compile("1")},
            {Pattern.compile("\\bstd\\b"), Pattern.compile("1")}
        };

        // Java patterns
        Pattern[][] javaPatterns = {
            {Pattern.compile("public\\s+class\\s+\\w+"), Pattern.compile("2")},
            {Pattern.compile("\\bextends\\s+\\w+"), Pattern.compile("1")},
            {Pattern.compile("\\b(public|private|protected)\\b"), Pattern.compile("1")},
            {Pattern.compile("\\bvoid\\b"), Pattern.compile("1")},
            {Pattern.compile("System\\.out\\.println", Pattern.CASE_INSENSITIVE), Pattern.compile("1")}
        };

        // JavaScript patterns
        Pattern[][] jsPatterns = {
            {Pattern.compile("\\b(var|let|const)\\s+\\w+"), Pattern.compile("2")},
            {Pattern.compile("function\\s+\\w*\\s*\\("), Pattern.compile("1")},
            {Pattern.compile("console\\.log\\s*\\("), Pattern.compile("1")},
            {Pattern.compile("=>"), Pattern.compile("1")},
            {Pattern.compile("\\binstanceof\\b"), Pattern.compile("1")},
            {Pattern.compile("\\bthis\\b"), Pattern.compile("1")}
        };

        // Calculate scores
        int pythonScore = scoreLanguage(codeClean, pythonPatterns);
        int cppScore = scoreLanguage(codeClean, cppPatterns);
        int javaScore = scoreLanguage(codeClean, javaPatterns);
        int jsScore = scoreLanguage(codeClean, jsPatterns);

        // Find the language with the highest score
        int maxScore = Math.max(Math.max(pythonScore, cppScore), Math.max(javaScore, jsScore));

        if (maxScore == 0) {
            return "unknown";
        }

        // Return the language with the highest score
        if (pythonScore == maxScore) {
            return "python";
        } else if (javaScore == maxScore) {
            return "java";
        } else if (jsScore == maxScore) {
            return "javascript";
        } else if (cppScore == maxScore) {
            return "c++";
        } else {
            return "unknown";
        }
    }

    private static int scoreLanguage(String code, Pattern[][] patterns) {
        int score = 0;
        for (Pattern[] patternWeight : patterns) {
            Pattern pattern = patternWeight[0];
            int weight = Integer.parseInt(patternWeight[1].pattern());
            if (pattern.matcher(code).find()) {
                score += weight;
            }
        }
        return score;
    }
}