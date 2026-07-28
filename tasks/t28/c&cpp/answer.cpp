#include <cstddef>

// Function to compute and return the size of an object in bytes.
template<typename T>
size_t size_in_bytes(const T& obj) {
    /**
     * Computes and returns the size of an object in bytes.
     *
     * Args:
     * obj (T): The object to measure the memory size of.
     *
     * Returns:
     * size_t: The size of the object in bytes.
     */
    return sizeof(obj);
}
