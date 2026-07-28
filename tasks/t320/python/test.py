import unittest
import tempfile
import os


class TestEnvReplacer(unittest.TestCase):

    def test_basic_replacement_default_format(self):
        env_vars = {"DB_HOST": "localhost", "DB_PORT": "5432"}
        content = "db: ${DB_HOST}:${DB_PORT}"
        result = replace_placeholders(content, env_vars, "${}")
        self.assertEqual(result, "db: localhost:5432")

    def test_different_placeholder_formats(self):
        env_vars = {"USER": "admin", "PASS": "secret"}

        content1 = "user={{USER}}, pass={{PASS}}"
        self.assertEqual(replace_placeholders(content1, env_vars, "{{}}"),
                         "user=admin, pass=secret")

        content2 = "user=%%USER%%, pass=%%PASS%%"
        self.assertEqual(replace_placeholders(content2, env_vars, "%%"),
                         "user=admin, pass=secret")

        content3 = "user=[USER], pass=[PASS]"
        self.assertEqual(replace_placeholders(content3, env_vars, "[]"),
                         "user=admin, pass=secret")

    def test_env_file_with_comments_and_empty_lines(self):
        with tempfile.NamedTemporaryFile(mode='w', delete=False, encoding='utf-8') as f:
            f.write("# This is a comment\n")
            f.write("DB_HOST=localhost\n")
            f.write("\n")  # Empty line
            f.write("DB_PORT=5432  \n")  # Trailing spaces
            f.write("INVALID_LINE\n")  # Invalid line (no equals sign)
            temp_env_path = f.name

        try:
            env_vars = load_env_file(temp_env_path)
            self.assertEqual(env_vars, {"DB_HOST": "localhost", "DB_PORT": "5432"})
        finally:
            if os.path.exists(temp_env_path):
                os.unlink(temp_env_path)

    def test_undefined_placeholders_remain(self):
        env_vars = {"EXISTING_VAR": "value"}
        content = "Existing: ${EXISTING_VAR}, Missing: ${MISSING_VAR}"
        result = replace_placeholders(content, env_vars, "${}")
        self.assertEqual(result, "Existing: value, Missing: ${MISSING_VAR}")

    def test_special_characters_in_values(self):
        env_vars = {
            "PASSWORD": "pa$$w0rd!@#",
            "MESSAGE": 'Hello "World"',
            "PATH": "/usr/local/bin"
        }
        content = 'pass={{PASSWORD}}, msg={{MESSAGE}}, path={{PATH}}'
        result = replace_placeholders(content, env_vars, "{{}}")
        self.assertEqual(
            result,
            'pass=pa$$w0rd!@#, msg=Hello "World", path=/usr/local/bin'
        )