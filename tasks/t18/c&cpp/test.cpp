#include <cstdint>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

TEST_CASE("TestPrintMemoryBits", "[print_memory_bits]") {
    struct RedirectStdout {
        std::stringstream buffer;
        std::streambuf* orig;

        RedirectStdout() : orig(std::cout.rdbuf(buffer.rdbuf())) {}
        ~RedirectStdout() { std::cout.rdbuf(orig); }

        std::string str() const { return buffer.str(); }
    };

    SECTION("test_single_byte") {
        std::vector<uint8_t> memory_section = {0b10101010};
        RedirectStdout redirector;
        print_memory_bits(memory_section);
        std::string output = redirector.str().substr(0, 8);
        REQUIRE(output == "10101010");
    }

    SECTION("test_multiple_bytes") {
        std::vector<uint8_t> memory_section = {0b11001100, 0b11110000};
        RedirectStdout redirector;
        print_memory_bits(memory_section);
        std::string output = redirector.str();
        REQUIRE(output == "11001100\n11110000\n");
    }

    SECTION("test_all_zeros") {
        std::vector<uint8_t> memory_section = {0b00000000};
        RedirectStdout redirector;
        print_memory_bits(memory_section);
        std::string output = redirector.str().substr(0, 8);
        REQUIRE(output == "00000000");
    }

    SECTION("test_all_ones") {
        std::vector<uint8_t> memory_section = {0b11111111};
        RedirectStdout redirector;
        print_memory_bits(memory_section);
        std::string output = redirector.str().substr(0, 8);
        REQUIRE(output == "11111111");
    }

    SECTION("test_empty_memory_section") {
        std::vector<uint8_t> memory_section = {};
        RedirectStdout redirector;
        print_memory_bits(memory_section);
        REQUIRE(redirector.str().empty());
    }
}
