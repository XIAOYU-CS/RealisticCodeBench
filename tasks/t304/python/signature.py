def parse_email(email_str: str):
    """
    Parse the email string and extract the account and corresponding platform (domain) information

    Args:
        email_str: String containing the email address

    Returns:
        If a valid email is matched, returns a dictionary {"account": account, "platform": platform domain}
        If no valid email is matched, returns None
    """