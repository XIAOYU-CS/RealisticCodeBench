#include <climits>
#include <functional>
#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>

using namespace std;

unordered_map<char, int> find_all_shortest_paths_using_dijkstra(const unordered_map<char, vector<pair<char, int>>> &graph, char start) {
    unordered_map<char, int> shortest_paths;
    for (const auto &entry : graph) {
        shortest_paths[entry.first] = INT_MAX;
    }
    shortest_paths[start] = 0;

    priority_queue<pair<int, char>, vector<pair<int, char>>, greater<pair<int, char>>> queue;
    queue.push({0, start});

    while (!queue.empty()) {
        int current_distance = queue.top().first;
        char current_node = queue.top().second;
        queue.pop();

        if (current_distance > shortest_paths[current_node]) {
            continue;
        }

        auto it = graph.find(current_node);
        if (it == graph.end()) {
            continue;
        }

        for (const auto &edge : it->second) {
            char neighbor = edge.first;
            int weight = edge.second;
            int distance = current_distance + weight;
            if (!shortest_paths.count(neighbor) || distance < shortest_paths[neighbor]) {
                shortest_paths[neighbor] = distance;
                queue.push({distance, neighbor});
            }
        }
    }

    return shortest_paths;
}
