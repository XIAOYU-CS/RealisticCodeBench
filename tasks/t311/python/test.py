import unittest
import os
import tempfile
from xml.etree.ElementTree import Element, tostring


class TestGenerateSitemap(unittest.TestCase):

    def test_basic_functionality(self):
        with tempfile.TemporaryDirectory() as root_dir:
            with open(os.path.join(root_dir, "page1.htm"), "w") as f:
                f.write("Test content")

            sitemap = generate_sitemap(root_dir, "https://example.com")
            xml_str = tostring(sitemap, encoding="unicode")

            self.assertEqual(len(sitemap.findall(".//url")), 2)
            self.assertIn("https://example.com/", xml_str)
            self.assertIn("https://example.com/page1.htm", xml_str)

    def test_url_transform_function(self):

        def remove_index_transform(url, rel_path, filename):
            if filename == "index.htm":
                return url.replace("index.htm", "")
            return url

        with tempfile.TemporaryDirectory() as root_dir:
            with open(os.path.join(root_dir, "index.htm"), "w") as f:
                f.write("Home page")

            sitemap = generate_sitemap(root_dir, "https://example.com", remove_index_transform)
            xml_str = tostring(sitemap, encoding="unicode")

            self.assertEqual(len(sitemap.findall(".//url")), 1)
            self.assertIn("https://example.com/", xml_str)
            self.assertNotIn("index.htm", xml_str)

    def test_special_characters_in_filenames(self):
        with tempfile.TemporaryDirectory() as root_dir:
            chinese_filename = "ProductIntroduction.htm"

            with open(os.path.join(root_dir, "about us.htm"), "w") as f:
                f.write("About page")
            with open(os.path.join(root_dir, chinese_filename), "w") as f:
                f.write("Product introduction")

            sitemap = generate_sitemap(root_dir, "https://example.com")
            xml_str = tostring(sitemap, encoding="unicode")

            expected_chinese_encoding = quote(chinese_filename)

            self.assertIn("about%20us.htm", xml_str)
            self.assertIn(expected_chinese_encoding, xml_str)

    def test_subdirectory_structure(self):
        with tempfile.TemporaryDirectory() as root_dir:
            subdir = os.path.join(root_dir, "blog")
            os.makedirs(subdir, exist_ok=True)
            with open(os.path.join(subdir, "post1.htm"), "w") as f:
                f.write("First blog post")
            with open(os.path.join(subdir, "post2.htm"), "w") as f:
                f.write("Second blog post")

            sitemap = generate_sitemap(root_dir, "https://example.com")
            xml_str = tostring(sitemap, encoding="unicode")

            self.assertEqual(len(sitemap.findall(".//url")), 3)
            self.assertIn("https://example.com/blog/post1.htm", xml_str)
            self.assertIn("https://example.com/blog/post2.htm", xml_str)

    def test_exclude_template_files(self):
        with tempfile.TemporaryDirectory() as root_dir:
            with open(os.path.join(root_dir, "contact.htm"), "w") as f:
                f.write("Contact page")
            with open(os.path.join(root_dir, "footer_template.htm"), "w") as f:
                f.write("Footer template")
            with open(os.path.join(root_dir, "template_header.htm"), "w") as f:
                f.write("Header template")

            sitemap = generate_sitemap(root_dir, "https://example.com")
            xml_str = tostring(sitemap, encoding="unicode")

            self.assertEqual(len(sitemap.findall(".//url")), 2)
            self.assertIn("contact.htm", xml_str)
            self.assertNotIn("footer_template.htm", xml_str)
            self.assertNotIn("template_header.htm", xml_str)