#include <string>
#include <sstream>

// Function to check if the given IP address is compliant based on predefined criteria.
bool is_compliant_ip(const std::string& ip) {
    std::string part;
    std::istringstream stream(ip);
    int values[4] = {};

    for (int i = 0; i < 4; ++i) {
        if (!std::getline(stream, part, '.') || part.empty() ||
            (part.size() > 1 && part[0] == '0')) {
            return false;
        }

        std::istringstream part_stream(part);
        if (!(part_stream >> values[i]) || !part_stream.eof() ||
            values[i] < 0 || values[i] > 255) {
            return false;
        }
    }

    if (std::getline(stream, part, '.')) {
        return false;
    }

    return values[0] == 10 ||
           (values[0] == 172 && values[1] >= 16 && values[1] <= 31) ||
           (values[0] == 192 && values[1] == 168);
}
