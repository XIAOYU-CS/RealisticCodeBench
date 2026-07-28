#include "signature.cpp"

#include <queue>
#include <stdexcept>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

Course::Course(
    std::string course_id,
    std::vector<std::string> must,
    std::vector<std::string> recommend
) : id(std::move(course_id)),
    must_courses(std::move(must)),
    recommend_courses(std::move(recommend)) {}

std::vector<LeveledCourse> topological_sort(const std::vector<Course>& courses) {
    std::unordered_map<std::string, std::vector<std::string>> graph;
    std::unordered_map<std::string, int> indegrees;
    std::unordered_map<std::string, int> levels;

    for (const auto& course : courses) {
        graph[course.id];
        indegrees[course.id] = 0;
        levels[course.id] = 0;
    }

    for (const auto& course : courses) {
        std::vector<std::string> prerequisites = course.must_courses;
        prerequisites.insert(prerequisites.end(), course.recommend_courses.begin(), course.recommend_courses.end());
        for (const auto& prereq : prerequisites) {
            if (!graph.count(prereq)) {
                throw std::invalid_argument("Unknown prerequisite: " + prereq);
            }
            graph[prereq].push_back(course.id);
            ++indegrees[course.id];
        }
    }

    std::queue<std::string> queue;
    for (const auto& course : courses) {
        if (indegrees[course.id] == 0) {
            queue.push(course.id);
        }
    }

    std::vector<std::string> sorted_ids;
    while (!queue.empty()) {
        auto current = queue.front();
        queue.pop();
        sorted_ids.push_back(current);

        for (const auto& neighbor : graph[current]) {
            --indegrees[neighbor];
            if (indegrees[neighbor] == 0) {
                queue.push(neighbor);
                levels[neighbor] = levels[current] + 1;
            }
        }
    }

    if (sorted_ids.size() != courses.size()) {
        throw std::invalid_argument("There is a cycle in the courses");
    }

    std::vector<LeveledCourse> result;
    result.reserve(courses.size());
    for (const auto& course : courses) {
        result.push_back({course, levels[course.id]});
    }
    return result;
}
