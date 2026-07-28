TEST_CASE("Test heap memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "55c12b4d6000-55c12b4f7000 rw-p 00000000 00:00 0 [heap]";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "heap"}};
    REQUIRE(result == expected);
}

TEST_CASE("Test stack memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "7fff5c1a2000-7fff5c1c3000 rw-p 00000000 00:00 0 [stack]";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "stack"}};
    REQUIRE(result == expected);
}

TEST_CASE("Test vdso memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "7fff5c1c3000-7fff5c1c5000 r-xp 00000000 00:00 0 [vdso]";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "vdso"}};
    REQUIRE(result == expected);
}

TEST_CASE("Test regular file-backed memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "7f8b8c000000-7f8b8c021000 r--p 00000000 08:01 123456 /lib/x86_64-linux-gnu/libc.so.6";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "file"}};
    REQUIRE(result == expected);
}

TEST_CASE("Test device file memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "7f8b8c021000-7f8b8c022000 rw-p 00000000 08:01 789012 /dev/zero";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "device"}};
    REQUIRE(result == expected);
}

TEST_CASE("Test anonymous memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "anonymous"}};
    REQUIRE(result == expected);
}

TEST_CASE("Test unknown memory mapping classification", "[classify_memory_mapping]") {
    std::string maps_line = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0 special_mapping";
    auto result = classify_memory_mapping(maps_line);
    std::map<std::string, std::string> expected = {{"type", "unknown"}};
    REQUIRE(result == expected);
}
