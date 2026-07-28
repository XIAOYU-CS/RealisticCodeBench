from __future__ import annotations

from typing import Iterable, Any, Iterator, Optional


class ReadOnlyListProxy:
    """
    A read-only proxy for list-like objects. Provides all read operations of a list,
    but prohibits any modification operations.

    The data source must support basic sequence operations such as indexing and length retrieval.
    """

    def __init__(self, data: Iterable[Any]):
        """
        Initialize the read-only list proxy.

        Args:
            data: The data source to be proxied; must be an iterable object.
        """
        # Convert the data source to a list to prevent external modifications from affecting the proxy

    def __getitem__(self, index: int | slice) -> Any:
        """Get an item by index or slice (read-only)."""

    def __len__(self) -> int:
        """Return the length of the sequence."""

    def __contains__(self, item: Any) -> bool:
        """Check if an item exists in the sequence."""

    def __iter__(self) -> Iterator[Any]:
        """Return an iterator over the sequence."""


    def __reversed__(self) -> Iterator[Any]:
        """Return a reverse iterator over the sequence."""


    def index(self, value: Any, start: int = 0, stop: Optional[int] = None) -> int:
        """
        Return the first index of the given value.

        Args:
            value: The value to search for.
            start: The starting index for the search.
            stop: The ending index for the search.

        Returns:
            The index of the first occurrence of the value.

        Raises:
            ValueError: If the value is not found in the sequence.
        """


    def count(self, value: Any) -> int:
        """Return the number of occurrences of the given value."""

    # Prohibit all modification operations
    def __setitem__(self, index: int | slice, value: Any) -> None:
        """Prohibit item assignment."""

    def __delitem__(self, index: int | slice) -> None:
        """Prohibit item deletion."""

    def insert(self, index: int, value: Any) -> None:
        """Prohibit inserting items."""

    def append(self, value: Any) -> None:
        """Prohibit appending items."""

    def clear(self) -> None:
        """Prohibit clearing the sequence."""

    def reverse(self) -> None:
        """Prohibit reversing the sequence."""

    def extend(self, other: Iterable[Any]) -> None:
        """Prohibit extending the sequence."""

    def pop(self, index: int = -1) -> Any:
        """Prohibit popping items."""

    def remove(self, value: Any) -> None:
        """Prohibit removing items."""

    def __iadd__(self, other: Iterable[Any]) -> Any:
        """Prohibit in-place addition (+=)."""

    def __repr__(self) -> str:
        """Return the string representation of the object."""
