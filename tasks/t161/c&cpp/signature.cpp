#include <string>
#include <vector>

struct TimestampRecord {
    int id;
    std::string timestamp;
};

bool operator==(const TimestampRecord& lhs, const TimestampRecord& rhs);
std::vector<TimestampRecord> sortByTimestamp(std::vector<TimestampRecord> array);
