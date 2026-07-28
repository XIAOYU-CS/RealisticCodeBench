#include <map>
#include <set>
#include <utility>
#include <vector>

class Graph {
public:
    explicit Graph(const std::vector<std::pair<int, int>>& edges);

    std::map<int, std::vector<Graph>> cycles_by_size(bool filter_repeat_nodes = true) const;
    std::set<int> nodes() const;

private:
    std::map<int, std::set<int>> adj_;

    std::vector<std::vector<int>> find_all_simple_cycles() const;
    void visit(int start, int node, std::vector<int>& stack, std::vector<std::vector<int>>& cycles) const;
    Graph subgraph(const std::vector<int>& nodes) const;
};
