import re

def detect_language(code: str) -> str:
    """
    Detects the programming language of the given code snippet based on syntax features.

    Args:
        code (str): The source code to analyze.

    Returns:
        str: The detected language ('python', 'java', 'javascript', 'c++', or 'unknown').
    """
    # Preprocessing: Remove leading/trailing whitespace
    code_clean = code.strip()

    # Python patterns
    python_patterns = [
        (re.compile(r'^[ \t]+def ', re.MULTILINE), 2),  # Indented function definition
        (re.compile(r'^[ \t]+class ', re.MULTILINE), 2),  # Indented class definition
        (re.compile(r'\bprint\s*\([^)]*\)'), 1),  # print function
        (re.compile(r'\bimport\s+\w+'), 1),  # import statement
        (re.compile(r'\bfrom\s+\w+\s+import'), 1),  # from...import
        (re.compile(r'\bdef\b'), 1),  # def keyword
        (re.compile(r'\bself\b'), 1),  # self keyword
        (re.compile(r'#[^\n]*$', re.MULTILINE), 1)  # comment
    ]

    # C++ patterns
    cpp_patterns = [
        (re.compile(r'#include\s*[<"][^>"]*[>"]'), 2),  # include directive
        (re.compile(r'cout\s*<<'), 1),  # cout
        (re.compile(r'using\s+namespace\s+\w+'), 1),  # namespace
        (re.compile(r'\w+::\w+'), 1),  # scope resolution operator
        (re.compile(r'\bstd\b'), 1)  # std namespace
    ]

    # Java patterns
    java_patterns = [
        (re.compile(r'public\s+class\s+\w+'), 2),  # public class
        (re.compile(r'\bextends\s+\w+'), 1),  # inheritance
        (re.compile(r'\b(public|private|protected)\b'), 1),  # access modifiers
        (re.compile(r'\bvoid\b'), 1),  # void return type
        (re.compile(r'System\.out\.println', re.IGNORECASE), 1)  # print statement
    ]

    # JavaScript patterns
    js_patterns = [
        (re.compile(r'\b(var|let|const)\s+\w+'), 2),  # variable declaration
        (re.compile(r'function\s+\w*\s*\('), 1),  # function definition
        (re.compile(r'console\.log\s*\('), 1),  # log function
        (re.compile(r'=>'), 1),  # arrow function
        (re.compile(r'\binstanceof\b'), 1),  # instanceof operator
        (re.compile(r'\bthis\b'), 1)  # this keyword
    ]

    # Scoring function
    def score_language(patterns):
        score = 0
        for pattern, weight in patterns:
            if pattern.search(code_clean):
                score += weight
        return score

    # Calculate scores
    scores = {
        'python': score_language(python_patterns),
        'c++': score_language(cpp_patterns),
        'java': score_language(java_patterns),
        'javascript': score_language(js_patterns)
    }

    # Find the language with the highest score
    max_score = max(scores.values())
    if max_score == 0:
        return 'unknown'

    # Return the language with the highest score
    for lang, score in scores.items():
        if score == max_score:
            return lang