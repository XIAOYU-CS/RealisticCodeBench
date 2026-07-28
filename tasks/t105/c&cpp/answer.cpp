#include <deque>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

std::vector<int> topological_sort_dfs(const std::vector<int>& vertices, const std::vector<std::pair<int, int>>& edges) {
    std::unordered_map<int, std::vector<int>> graph;
    for (const auto& edge : edges) {
        graph[edge.first].push_back(edge.second);
    }

    std::unordered_set<int> visited;
    std::unordered_set<int> visiting;
    std::deque<int> result;

    auto dfs = [&](auto&& self, int node) -> bool {
        if (visiting.count(node)) return false;
        if (visited.count(node)) return true;

        visiting.insert(node);
        visited.insert(node);
        for (int neighbor : graph[node]) {
            if (!self(self, neighbor)) return false;
        }
        visiting.erase(node);
        result.push_front(node);
        return true;
    };

    for (int vertex : vertices) {
        if (!visited.count(vertex) && !dfs(dfs, vertex)) {
            return {};
        }
    }

    return {result.begin(), result.end()};
}
