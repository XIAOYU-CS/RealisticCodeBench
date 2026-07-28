#include "signature.cpp"

#include <algorithm>
#include <sstream>
#include <tuple>

bool operator==(const TimestampRecord& lhs, const TimestampRecord& rhs) {
    return lhs.id == rhs.id && lhs.timestamp == rhs.timestamp;
}

static std::tuple<int, int, int, int, int, int> timestampKey(const std::string& timestamp) {
    int year = 0;
    int month = 0;
    int day = 0;
    int hour = 0;
    int minute = 0;
    int second = 0;
    char c1 = 0;
    char c2 = 0;
    char c3 = 0;
    char c4 = 0;
    char c5 = 0;

    std::istringstream iso(timestamp);
    if (iso >> year >> c1 >> month >> c2 >> day >> c3 >> hour >> c4 >> minute >> c5 >> second) {
        return {year, month, day, hour, minute, second};
    }

    static const std::vector<std::string> months = {
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    };
    std::string name;
    char comma = 0;
    std::istringstream named(timestamp);
    if (named >> name >> day >> comma >> year >> hour >> c1 >> minute >> c2 >> second) {
        auto it = std::find(months.begin(), months.end(), name);
        month = it == months.end() ? 0 : static_cast<int>(it - months.begin()) + 1;
    }

    return {year, month, day, hour, minute, second};
}

std::vector<TimestampRecord> sortByTimestamp(std::vector<TimestampRecord> array) {
    std::stable_sort(array.begin(), array.end(), [](const TimestampRecord& lhs, const TimestampRecord& rhs) {
        return timestampKey(lhs.timestamp) < timestampKey(rhs.timestamp);
    });
    return array;
}
