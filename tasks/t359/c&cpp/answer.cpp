#include <vector>
#include <cmath>
#include <algorithm>
#include <tuple>

using namespace std;

struct Vector3 {
    float x, y, z;
};

static double distance_between(const Vector3& a, const Vector3& b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    double dz = a.z - b.z;
    return sqrt(dx * dx + dy * dy + dz * dz);
}

class DisjointSet {
public:
    vector<int> parent;
    vector<int> rank;

    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }

    int find(int i) {
        if (parent[i] != i) {
            parent[i] = find(parent[i]);
        }
        return parent[i];
    }

    void union_sets(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);

        if (root_i != root_j) {
            if (rank[root_i] > rank[root_j]) {
                parent[root_j] = root_i;
            } else if (rank[root_i] < rank[root_j]) {
                parent[root_i] = root_j;
            } else {
                parent[root_j] = root_i;
                rank[root_i]++;
            }
        }
    }
};

vector<vector<int>> compute_mst(const vector<Vector3>& points) {
    int num_points = points.size();

    if (num_points <= 1) {
        return vector<vector<int>>(num_points);
    }

    vector<tuple<int, int, double>> edges;
    for (int i = 0; i < num_points; ++i) {
        for (int j = i + 1; j < num_points; ++j) {
            double dist = distance_between(points[i], points[j]);
            edges.emplace_back(i, j, dist);
        }
    }

    sort(edges.begin(), edges.end(), [](const tuple<int, int, double>& a, const tuple<int, int, double>& b) {
        return get<2>(a) < get<2>(b);
    });

    DisjointSet ds(num_points);
    vector<vector<int>> mst(num_points);
    int edges_added = 0;
    int required_edges = num_points - 1;

    for (const auto& edge : edges) {
        int i = get<0>(edge);
        int j = get<1>(edge);
        if (ds.find(i) != ds.find(j)) {
            ds.union_sets(i, j);
            mst[i].push_back(j);
            mst[j].push_back(i);
            edges_added++;
            if (edges_added == required_edges) {
                break;
            }
        }
    }

    return mst;
}
