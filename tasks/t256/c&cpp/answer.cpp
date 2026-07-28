int binary_search_closest(const std::vector<int>& array, int target) {
    int left = 0;
    int right = static_cast<int>(array.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (array[mid] == target) {
            return mid;
        }
        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (left >= static_cast<int>(array.size())) {
        return static_cast<int>(array.size()) - 1;
    }
    if (right < 0) {
        return 0;
    }
    return std::abs(array[left] - target) < std::abs(array[right] - target) ? left : right;
}
