#include <string>
#include <vector>
#include <sstream>
#include <stdexcept>
#include <utility>

std::pair<std::string, std::string> extract_sld_tld(const std::string& fqdn) {
    std::istringstream iss(fqdn);
    std::vector<std::string> parts;
    std::string part;
    while (std::getline(iss, part, '.')) {
        parts.push_back(part);
    }

    if (parts.size() < 2) {
        throw std::invalid_argument("Invalid FQDN");
    }

    return {parts[parts.size() - 2], parts.back()};
}
