#include "signature.cpp"

#include <algorithm>

Graph::Graph(const std::vector<std::pair<int, int>>& edges) {
    for (const auto& [source, target] : edges) {
        adj_[source].insert(target);
        adj_[target];
    }
}

std::map<int, std::vector<Graph>> Graph::cycles_by_size(bool filter_repeat_nodes) const {
    std::map<int, std::vector<Graph>> result;
    std::set<std::vector<int>> seen;

    for (const auto& cycle : find_all_simple_cycles()) {
        if (cycle.size() <= 2) {
            continue;
        }

        if (filter_repeat_nodes && std::set<int>(cycle.begin(), cycle.end()).size() != cycle.size()) {
            continue;
        }

        std::vector<int> key = cycle;
        std::sort(key.begin(), key.end());
        if (!seen.insert(key).second) {
            continue;
        }

        result[static_cast<int>(cycle.size())].push_back(subgraph(cycle));
    }

    return result;
}

std::set<int> Graph::nodes() const {
    std::set<int> result;
    for (const auto& [node, neighbors] : adj_) {
        result.insert(node);
        result.insert(neighbors.begin(), neighbors.end());
    }
    return result;
}

std::vector<std::vector<int>> Graph::find_all_simple_cycles() const {
    std::vector<std::vector<int>> cycles;
    for (const auto& [start, _] : adj_) {
        std::vector<int> stack{start};
        visit(start, start, stack, cycles);
    }
    return cycles;
}

void Graph::visit(int start, int node, std::vector<int>& stack, std::vector<std::vector<int>>& cycles) const {
    const auto it = adj_.find(node);
    if (it == adj_.end()) {
        return;
    }

    for (int next : it->second) {
        if (next == start && stack.size() > 1) {
            cycles.push_back(stack);
        } else if (std::find(stack.begin(), stack.end(), next) == stack.end()) {
            stack.push_back(next);
            visit(start, next, stack, cycles);
            stack.pop_back();
        }
    }
}

Graph Graph::subgraph(const std::vector<int>& nodes) const {
    const std::set<int> keep(nodes.begin(), nodes.end());
    std::vector<std::pair<int, int>> edges;
    for (int source : keep) {
        const auto it = adj_.find(source);
        if (it == adj_.end()) {
            continue;
        }

        for (int target : it->second) {
            if (keep.count(target) != 0) {
                edges.emplace_back(source, target);
            }
        }
    }
    return Graph(edges);
}
