import unittest


class TestCheckPermissions(unittest.TestCase):

    def test_owner_permissions_read_write(self):
        line = "-rw-r--r-- 1 user group 1024 Jan 1 12:00 file.txt"
        result = check_permissions(line, ["r", "w"], "owner")
        self.assertTrue(result)

    def test_group_permissions_execute_only(self):
        line = "-rwx--x--x 1 user group 1024 Jan 1 12:00 script.sh"
        result = check_permissions(line, ["x"], "group")
        self.assertTrue(result)

    def test_other_permissions_no_read_access(self):
        line = "-rwxrwx--- 1 user group 1024 Jan 1 12:00 private_file.txt"
        result = check_permissions(line, ["r"], "other")
        self.assertFalse(result)

    def test_default_no_required_permissions(self):
        line = "-rwxr-xr-- 1 user group 1024 Jan 1 12:00 file.txt"
        result = check_permissions(line)  # No required_perms specified
        self.assertTrue(result)

    def test_invalid_permission_format(self):
        line = "invalid_line_without_proper_permissions"
        result = check_permissions(line, ["r"], "owner")
        self.assertFalse(result)