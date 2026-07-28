#include <algorithm>
#include <set>
#include <stack>

Vector3 create_vector3(float x, float y, float z) {
    return Vector3{x, y, z};
}


TEST_CASE("compute_mst handles various input cases", "[mst]") {
    Vector3 point0 = create_vector3(0, 0, 0);
    Vector3 point1 = create_vector3(1, 0, 0);
    Vector3 point2 = create_vector3(3, 0, 0);
    Vector3 point3 = create_vector3(0, 1, 0);
    Vector3 point4 = create_vector3(0, 0, 1);

    SECTION("Empty input") {
        auto mst = compute_mst({});
        REQUIRE(mst.empty());
    }

    SECTION("Single point") {
        auto mst = compute_mst({point0});
        REQUIRE(mst.size() == 1);
        REQUIRE(mst[0].empty());
    }

    SECTION("Two points") {
        auto mst = compute_mst({point0, point1});
        REQUIRE(mst.size() == 2);
        REQUIRE(mst[0].size() == 1);
        REQUIRE(mst[1].size() == 1);
        REQUIRE(mst[0][0] == 1);
        REQUIRE(mst[1][0] == 0);
    }

    SECTION("Three collinear points") {
        auto mst = compute_mst({point0, point1, point2});
        REQUIRE(mst.size() == 3);

        int total_edges = 0;
        for (const auto& neighbors : mst) {
            total_edges += static_cast<int>(neighbors.size());
        }
        total_edges /= 2;
        REQUIRE(total_edges == 2);

        bool has_edge_0_1 = (std::find(mst[0].begin(), mst[0].end(), 1) != mst[0].end());
        bool has_edge_1_2 = (std::find(mst[1].begin(), mst[1].end(), 2) != mst[1].end());
        REQUIRE(has_edge_0_1);
        REQUIRE(has_edge_1_2);
    }

    SECTION("Four 3D points") {
        auto mst = compute_mst({point0, point1, point3, point4});
        REQUIRE(mst.size() == 4);

        int total_edges = 0;
        for (const auto& neighbors : mst) {
            total_edges += static_cast<int>(neighbors.size());
        }
        total_edges /= 2;
        REQUIRE(total_edges == 3);

        std::set<int> visited;
        std::stack<int> stack;
        stack.push(0);

        while (!stack.empty()) {
            int node = stack.top();
            stack.pop();
            if (visited.find(node) == visited.end()) {
                visited.insert(node);
                for (int neighbor : mst[node]) {
                    if (visited.find(neighbor) == visited.end()) {
                        stack.push(neighbor);
                    }
                }
            }
        }

        REQUIRE(visited.size() == 4);
    }
}
