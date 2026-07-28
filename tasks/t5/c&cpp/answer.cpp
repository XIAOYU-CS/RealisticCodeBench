#include <vector>

// Function to check whether point C is on the line formed by points A and B
bool is_point_on_line(const std::vector<int>& A, const std::vector<int>& B, const std::vector<int>& C) {
    long long x_a = A[0], y_a = A[1];
    long long x_b = B[0], y_b = B[1];
    long long x_c = C[0], y_c = C[1];

    long long dx = x_b - x_a;
    long long dy = y_b - y_a;
    long long cross_product = (y_c - y_a) * dx - dy * (x_c - x_a);
    long long dot_product = (x_c - x_a) * dx + (y_c - y_a) * dy;
    long long squared_length = dx * dx + dy * dy;

    return cross_product == 0 && dot_product >= 0 && dot_product <= squared_length;
}
