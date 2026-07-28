#include <chrono>

TEST_CASE("timePassed function") {
    auto now_ms = [] {
        return std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
    };

    SECTION("should correctly calculate time passed from 1 minute ago") {
        long long startTime = now_ms() - 60000;
        REQUIRE(time_passed(startTime) == "1:00");
    }

    SECTION("should handle the boundary of 59 seconds correctly") {
        long long startTime = now_ms() - 5900;
        REQUIRE(time_passed(startTime) == "0:05");
    }

    SECTION("should return 0:00 when start time is the same as current time") {
        REQUIRE(time_passed(now_ms()) == "0:00");
    }

    SECTION("should handle negative time differences (future start time)") {
        long long startTime = now_ms() + 60000;
        std::string result = time_passed(startTime);
        REQUIRE(result.find('-') != std::string::npos);
    }

    SECTION("should handle very large time differences correctly") {
        long long startTime = now_ms() - (126230400LL * 1000);
        REQUIRE(time_passed(startTime) == "2103840:00");
    }
}
