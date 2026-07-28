#include <string>
#include <vector>

struct Course {
    std::string id;
    std::vector<std::string> must_courses;
    std::vector<std::string> recommend_courses;

    Course(
        std::string course_id,
        std::vector<std::string> must = {},
        std::vector<std::string> recommend = {}
    );
};

struct LeveledCourse {
    Course course;
    int level;
};

std::vector<LeveledCourse> topological_sort(const std::vector<Course>& courses);
