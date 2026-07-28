#include <array>
#include <cstdio>
#include <optional>
#include <regex>
#include <string>

using OptionalString = std::optional<std::string>;

namespace {
bool has_ipconfig_output_for_test = false;
std::string ipconfig_output_for_test;

OptionalString find_local_ip(const std::string& output) {
    static const std::regex ip_pattern(R"(\b(?:\d{1,3}\.){3}\d{1,3}\b)");
    for (std::sregex_iterator it(output.begin(), output.end(), ip_pattern), end; it != end; ++it) {
        std::string ip = it->str();
        if (ip.rfind("192.168.", 0) == 0) {
            return ip;
        }
    }
    return std::nullopt;
}

std::string run_ipconfig() {
    std::array<char, 256> buffer{};
    std::string output;
    FILE* pipe = popen("ipconfig", "r");
    if (!pipe) {
        return output;
    }
    while (fgets(buffer.data(), static_cast<int>(buffer.size()), pipe)) {
        output += buffer.data();
    }
    pclose(pipe);
    return output;
}
}  // namespace

void set_ipconfig_output_for_test(const std::string& output) {
    has_ipconfig_output_for_test = true;
    ipconfig_output_for_test = output;
}

void clear_ipconfig_output_for_test() {
    has_ipconfig_output_for_test = false;
    ipconfig_output_for_test.clear();
}

OptionalString get_windows_local_ip(const std::string& interface = "Wi-Fi") {
    (void)interface;
    const std::string output = has_ipconfig_output_for_test ? ipconfig_output_for_test : run_ipconfig();
    return find_local_ip(output);
}
