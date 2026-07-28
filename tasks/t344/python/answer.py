import re
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
    # Set default tag list
    if target_tags is None:
        target_tags = ['p', 'ul', 'ol']

    # Validate tag format
    valid_tags = [tag.strip() for tag in target_tags if tag.strip()]
    if not valid_tags:
        raise ValueError("At least one valid tag must be specified")

    # Build regex pattern to support tag attributes and case insensitive matching
    # Using non-greedy matching (*?) to handle nested tags properly
    pattern_parts = [
        f'<{re.escape(tag)}\\b[^>]*?>.*?</{re.escape(tag)}>'
        for tag in valid_tags
    ]
    pattern = re.compile('|'.join(pattern_parts), re.DOTALL | re.IGNORECASE)

    # Find all matching tag blocks
    matches = list(pattern.finditer(html))

    # Split string into non-tag parts and tag parts
    result = []
    last_end = 0

    for match in matches:
        # Add non-tag content before this match
        non_tag_content = html[last_end:match.start()]
        if non_tag_content:
            if not preserve_whitespace:
                non_tag_content = non_tag_content.strip()
            if non_tag_content:  # Only add non-empty content
                result.append(non_tag_content)

        # Add the matched tag content
        tag_content = match.group()
        result.append(tag_content)

        last_end = match.end()

    # Handle remaining non-tag content
    remaining_content = html[last_end:]
    if remaining_content:
        if not preserve_whitespace:
            remaining_content = remaining_content.strip()
        if remaining_content:
            result.append(remaining_content)

    return result