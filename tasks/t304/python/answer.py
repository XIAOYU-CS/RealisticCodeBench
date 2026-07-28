import re

def parse_email(email_str: str):
    """
    Parse the email string and extract the account and corresponding platform (domain) information

    Args:
        email_str: String containing the email address

    Returns:
        If a valid email is matched, returns a dictionary {"account": account, "platform": platform domain}
        If no valid email is matched, returns None
    """
    email_pattern = r"([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)"

    if not isinstance(email_str, str):
        return None

    match = re.search(email_pattern, email_str)

    if match:
        account = match.group(1)
        platform = f"@{match.group(2)}"  # Keep the @ symbol
        return {
            "account": account,
            "platform": platform,
            "full_email": match.group(0)  # Also return the full email
        }
    else:
        return None