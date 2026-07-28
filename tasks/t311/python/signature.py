def generate_sitemap(root_dir, base_url, url_transform_func=None):
    """
    Generates a website XML sitemap with support for custom URL transformation and flexible path handling.

    Args:
        root_dir (str): Local path to the website's root directory
        base_url (str): Base URL of the website (e.g., https://example.com/)
        url_transform_func (callable, optional): Custom URL transformation function that takes (original URL, relative path, filename) as inputs and returns a transformed URL

    Returns:
        Element: Root node of the generated XML element tree
    """