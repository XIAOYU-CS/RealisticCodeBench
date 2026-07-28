from xml.etree.ElementTree import SubElement
from urllib.parse import quote


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
    normalized_base = base_url.rstrip('/') + '/'

    urlset = Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    urls = [normalized_base]

    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.htm') and 'template' not in filename:
                full_path = os.path.join(dirpath, filename)

                rel_path = os.path.relpath(full_path, root_dir)

                url_path = rel_path.replace(os.path.sep, '/')

                encoded_path = quote(url_path)

                raw_url = normalized_base + encoded_path

                if url_transform_func and callable(url_transform_func):
                    final_url = url_transform_func(raw_url, rel_path, filename)
                else:
                    final_url = raw_url

                urls.append(final_url)

    unique_sorted_urls = sorted(list(set(urls)))

    for url in unique_sorted_urls:
        url_elem = SubElement(urlset, 'url')
        loc_elem = SubElement(url_elem, 'loc')
        loc_elem.text = url

    print(f'Added {len(unique_sorted_urls)} page to the site map')
    return urlset