from __future__ import annotations

from typing import Any, Iterable, Optional, Iterator

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
        self._data = list(data)

    def __getitem__(self, index: int | slice) -> Any:
        """Get an item by index or slice (read-only)."""
        return self._data[index]

    def __len__(self) -> int:
        """Return the length of the sequence."""
        return len(self._data)

    def __contains__(self, item: Any) -> bool:
        """Check if an item exists in the sequence."""
        return item in self._data

    def __iter__(self) -> Iterator[Any]:
        """Return an iterator over the sequence."""
        return iter(self._data)

    def __reversed__(self) -> Iterator[Any]:
        """Return a reverse iterator over the sequence."""
        return reversed(self._data)

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
        if stop is None:
            stop = len(self._data)
        return self._data.index(value, start, stop)

    def count(self, value: Any) -> int:
        """Return the number of occurrences of the given value."""
        return self._data.count(value)

    # Prohibit all modification operations
    def __setitem__(self, index: int | slice, value: Any) -> None:
        """Prohibit item assignment."""
        raise TypeError("'ReadOnlyListProxy' object does not support item assignment")

    def __delitem__(self, index: int | slice) -> None:
        """Prohibit item deletion."""
        raise TypeError("'ReadOnlyListProxy' object does not support item deletion")

    def insert(self, index: int, value: Any) -> None:
        """Prohibit inserting items."""
        raise TypeError("'ReadOnlyListProxy' object does not support insert()")

    def append(self, value: Any) -> None:
        """Prohibit appending items."""
        raise TypeError("'ReadOnlyListProxy' object does not support append()")

    def clear(self) -> None:
        """Prohibit clearing the sequence."""
        raise TypeError("'ReadOnlyListProxy' object does not support clear()")

    def reverse(self) -> None:
        """Prohibit reversing the sequence."""
        raise TypeError("'ReadOnlyListProxy' object does not support reverse()")

    def extend(self, other: Iterable[Any]) -> None:
        """Prohibit extending the sequence."""
        raise TypeError("'ReadOnlyListProxy' object does not support extend()")

    def pop(self, index: int = -1) -> Any:
        """Prohibit popping items."""
        raise TypeError("'ReadOnlyListProxy' object does not support pop()")

    def remove(self, value: Any) -> None:
        """Prohibit removing items."""
        raise TypeError("'ReadOnlyListProxy' object does not support remove()")

    def __iadd__(self, other: Iterable[Any]) -> Any:
        """Prohibit in-place addition (+=)."""
        raise TypeError("'ReadOnlyListProxy' object does not support in-place addition")

    def __repr__(self) -> str:
        """Return the string representation of the object."""
        return f"ReadOnlyListProxy({self._data!r})"
