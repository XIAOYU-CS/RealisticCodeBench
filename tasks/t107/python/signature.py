from dataclasses import is_dataclass
from typing import Any, Dict


def convert_class_instance_to_dict(obj: Any) -> Dict[str, Any]:
    """
    Converts a dataclass or class instance to a dictionary.

    Args:
        obj: An instance of a dataclass or a class.

    Returns:
        A dictionary representation of the class or dataclass.
    """
