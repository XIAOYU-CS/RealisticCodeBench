#include <iostream>
#include <vector>
#include <algorithm>  // for std::reverse

void reverse_range(std::vector<int>& v, int a, int b) {
    if (a < 0 || b >= v.size() || a > b) {
        std::cerr << "Invalid indices" << std::endl;
        return;
    }
    std::reverse(v.begin() + a, v.begin() + b + 1);
}
