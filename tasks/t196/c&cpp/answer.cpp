#include <vector>

std::vector<int*> elements_before_null(const std::vector<int*>& array) {
    std::vector<int*> result;

    for (int* element : array) {
        if (element == nullptr) {
            break;
        }
        result.push_back(element);
    }

    return result;
}
