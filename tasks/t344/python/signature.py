from typing import List, Union


def split_html_content(
        html: str,
        target_tags: Union[List[str], None] = None,
        preserve_whitespace: bool = False
) -> List[str]:
    """
    Split HTML string into tag blocks and non-tag text blocks by specified tags

    Parameters:
        html: String containing HTML content
        target_tags: List of tags to match, e.g. ["div", "span"], defaults to handling p, ul, ol
        preserve_whitespace: Whether to preserve whitespace characters, False to automatically strip leading/trailing whitespace

    Returns:
        List of split content arranged in original order
    """