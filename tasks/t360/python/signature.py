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