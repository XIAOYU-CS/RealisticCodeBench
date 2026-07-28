#include <algorithm>
#include <vector>

std::vector<int> find_longest_non_decreasing_subsequence(const std::vector<int>& nums) {
    if (nums.empty()) {
        return {};
    }

    std::vector<int> dp(nums.size(), 1);
    std::vector<int> previous(nums.size(), -1);
    int last = 0;

    for (int i = 1; i < static_cast<int>(nums.size()); ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[i] >= nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                previous[i] = j;
            }
        }
        if (dp[i] > dp[last]) {
            last = i;
        }
    }

    std::vector<int> result;
    for (; last != -1; last = previous[last]) {
        result.push_back(nums[last]);
    }
    std::reverse(result.begin(), result.end());
    return result;
}
