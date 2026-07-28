#include <string>
#include <vector>

template <typename O, typename GetId>
std::vector<O> mergeArraysWithReplacement(
    const std::vector<O>& arr1,
    const std::vector<O>& arr2,
    GetId getId);
