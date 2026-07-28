import re
import unittest


def generate_package_name(game_name, config=None):
    """
    Generates a package name from a game name according to the specified configuration.

    This function normalizes the input game name by:
    - Converting to lowercase
    - Replacing spaces, underscores, and hyphens with the specified separator
    - Removing invalid characters (keeping only alphanumeric characters and separators)
    - Merging consecutive separators
    - Removing leading and trailing separators
    - Adding a prefix to prevent leading numbers if not allowed

    Args:
        game_name (str): The input game name to convert to a package name
        config (dict, optional): Configuration options for package name generation
            - prefix (str): Custom prefix for the package name (default: 'com.')
            - separator (str): Separator character to use (default: '.')
            - allowLeadingNumber (bool): Whether to allow package names starting with numbers (default: False)

    Returns:
        str or None: The generated package name, or None if the result would be empty
    """
    if config is None:
        config = {}

    # Parse configuration with default values
    prefix = config.get('prefix', 'com.')
    separator = config.get('separator', '.')
    allow_leading_number = config.get('allowLeadingNumber', False)

    # Validate input
    if not game_name or not isinstance(game_name, str):
        return None

    normalized_game_name = game_name.strip().lower()

    # Escape separator for use in regex
    escaped_separator = re.escape(separator)

    # Replace spaces, underscores, and hyphens with the configured separator
    normalized_game_name = re.sub(r'[\s_\-]+', separator, normalized_game_name)

    # Keep only alphanumeric characters and the configured separator
    normalized_game_name = re.sub(rf'[^\d{escaped_separator}a-z]', '', normalized_game_name)

    # Merge consecutive separators
    normalized_game_name = re.sub(rf'{escaped_separator}+', separator, normalized_game_name)

    # Remove leading and trailing separators
    normalized_game_name = re.sub(rf'^{escaped_separator}+', '', normalized_game_name)
    normalized_game_name = re.sub(rf'{escaped_separator}+$', '', normalized_game_name)

    # Handle leading number case based on configuration
    if not allow_leading_number and re.match(r'^\d', normalized_game_name):
        normalized_game_name = f'app{separator}' + normalized_game_name

    # Return None if result is empty
    if normalized_game_name == '':
        return None

    return prefix + normalized_game_name