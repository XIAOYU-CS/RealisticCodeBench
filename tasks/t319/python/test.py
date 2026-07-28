import unittest
class TestEvaluateCommand(unittest.TestCase):
    def setUp(self):
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
        command = "Connect to the database server"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "yes",
            "database": "no",
            "ui": "no",
            "security": "no"
        }

        self.assertEqual(result, expected)

    def test_multiple_module_activation(self):
        command = "User login with password verification"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",
            "database": "no",
            "ui": "yes",
            "security": "yes"
        }

        self.assertEqual(result, expected)

    def test_case_insensitive_matching(self):
        command = "SELECT * FROM users WHERE ID = 1"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",
            "database": "yes",
            "ui": "no",
            "security": "no"
        }

        self.assertEqual(result, expected)

    def test_no_matching_keywords(self):
        command = "Calculate the sum of numbers"
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",
            "database": "no",
            "ui": "no",
            "security": "no"
        }

        self.assertEqual(result, expected)

    def test_empty_command(self):
        command = ""
        result = evaluate_command(command, self.test_config)

        expected = {
            "network": "no",
            "database": "no",
            "ui": "no",
            "security": "no"
        }

        self.assertEqual(result, expected)