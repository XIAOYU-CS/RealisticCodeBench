from typing import List


def extract_html_waffle_table_to_csv_data(html_content: str) -> List[List[str]]:
    """
    Extract table question from an HTML string containing tables and return the question organized as a two-dimensional array.

    Args:
        html_content (str): A string containing HTML content.

    Returns:
        List[List[str]]: A two-dimensional array of strings representing the table data.
    """