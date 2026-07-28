#include <algorithm>
#include <random>
#include <string>

std::string create_36_char_uuid() {
    static std::mt19937 rng(std::random_device{}());
    const std::string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const std::string lowercase = "abcdefghijklmnopqrstuvwxyz";
    const std::string digits = "0123456789";
    const std::string possibleChars = uppercase + lowercase + digits;
    std::uniform_int_distribution<std::size_t> allDist(0, possibleChars.size() - 1);
    std::uniform_int_distribution<std::size_t> upperDist(0, uppercase.size() - 1);
    std::uniform_int_distribution<std::size_t> lowerDist(0, lowercase.size() - 1);
    std::uniform_int_distribution<std::size_t> digitDist(0, digits.size() - 1);

    std::string uuid(36, '\0');
    uuid[0] = uppercase[upperDist(rng)];
    uuid[1] = lowercase[lowerDist(rng)];
    uuid[2] = digits[digitDist(rng)];
    for (std::size_t i = 3; i < uuid.size(); ++i) {
        uuid[i] = possibleChars[allDist(rng)];
    }
    std::shuffle(uuid.begin(), uuid.end(), rng);
    return uuid;
}
