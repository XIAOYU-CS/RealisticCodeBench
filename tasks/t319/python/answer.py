def evaluate_command(command, config):
    """
    Evaluate modules involved in a command based on external configuration to determine associations.

    Args:
        command (str): Command string to be evaluated
        config (dict): Configuration dictionary containing module definitions and judgment rules
                Structure: {
                    "sections": ["module1", "module2", ...],  # List of all modules
                    "rules": [
                        {
                            "keywords": ["keyword1", "keyword2"],  # Trigger keywords
                            "sections": ["module1", "module3"]     # Associated modules
                        },
                        ...
                    ]
                }

    Returns:
        dict: Results indicating whether each module is used ("yes"/"no")

    Example:
        >>> config = {
        ...     "sections": ["network", "database", "ui"],
        ...     "rules": [{
        ...         "keywords": ["connect", "disconnect"],
        ...         "sections": ["network"]
        ...     }]
        ... }
        >>> evaluate_command("connect to server", config)
        {'network': 'yes', 'database': 'no', 'ui': 'no'}
    """
    # Validate input parameters
    if not isinstance(command, str):
        raise TypeError("command must be a string")

    if not isinstance(config, dict):
        raise TypeError("config must be a dictionary")

    if "sections" not in config or "rules" not in config:
        raise ValueError("config must contain 'sections' and 'rules' keys")

    # Initialize result dictionary with all modules defaulting to "no"
    result = {section: "no" for section in config["sections"]}

    # Iterate through all rules to check if command matches keywords and update corresponding modules
    for rule in config["rules"]:
        # Validate rule structure
        if not isinstance(rule, dict) or "keywords" not in rule or "sections" not in rule:
            continue  # Skip invalid rules

        # Check if command contains any keywords from the current rule (case-insensitive)
        command_lower = command.lower()
        if any(keyword.lower() in command_lower for keyword in rule["keywords"]):
            # Mark associated modules as "yes"
            for section in rule["sections"]:
                if section in result:  # Ensure module is in predefined list
                    result[section] = "yes"

    return result

# TEST CASE
import unittest
class TestEvaluateCommand(unittest.TestCase):
    """Test suite for evaluate_command function."""

    def setUp(self):
        """Set up test configuration for all test cases."""
        self.test_config = {
            "sections": ["network", "database", "ui", "security"],
            "rules": [
                {
                    "keywords": ["connect", "disconnect", "ping"],
                    "sections": ["network"]
                },
                {
                    "keywords": ["select", "insert", "update", "delete"],
                    "sections": ["database"]
                },
                {
                    "keywords": ["login", "logout", "password"],
                    "sections": ["security", "ui"]
                },
                {
                    "keywords": ["show", "display"],
                    "sections": ["ui"]
                }
            ]
        }

    def test_normal_keyword_matching(self):
        """Test normal keyword matching functionality."""
        command = "Connect to the database server"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "yes",  # 'connect' matches network rule
            "database": "no",  # no database keywords
            "ui": "no",  # no UI keywords
            "security": "no"  # no security keywords
        }

        self.assertEqual(result, expected)

    def test_multiple_module_activation(self):
        """Test that a single command can activate multiple modules."""
        command = "User login with password verification"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",  # no network keywords
            "database": "no",  # no database keywords
            "ui": "yes",  # 'login' matches UI through security rule
            "security": "yes"  # 'login' and 'password' match security rule
        }

        self.assertEqual(result, expected)

    def test_case_insensitive_matching(self):
        """Test that keyword matching is case-insensitive."""
        command = "SELECT * FROM users WHERE ID = 1"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",  # no network keywords
            "database": "yes",  # 'SELECT' matches database rule (case-insensitive)
            "ui": "no",  # no UI keywords
            "security": "no"  # no security keywords
        }

        self.assertEqual(result, expected)

    def test_no_matching_keywords(self):
        """Test behavior when no keywords match."""
        command = "Calculate the sum of numbers"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",  # no matching keywords
            "database": "no",  # no matching keywords
            "ui": "no",  # no matching keywords
            "security": "no"  # no matching keywords
        }

        self.assertEqual(result, expected)

    def test_empty_command(self):
        """Test behavior with empty command string."""
        command = ""
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",  # no matching keywords
            "database": "no",  # no matching keywords
            "ui": "no",  # no matching keywords
            "security": "no"  # no matching keywords
        }

        self.assertEqual(result, expected)