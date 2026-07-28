#include <cstdint>
#include <functional>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

struct BatchBreakpointResult {
    std::vector<std::pair<std::string, int>> success;
    std::vector<std::pair<std::string, std::string>> failed;
};

class GdbError : public std::runtime_error {
public:
    explicit GdbError(const std::string& message);
};

class GdbEnvironment {
public:
    static std::function<std::uint64_t(const std::string&)> parseAndEvalMock;
    static std::function<std::string(const std::string&, bool)> executeMock;

    static void clear();
    static void setMemory(const std::string& address, const std::string& value);
    static std::uint64_t parseAndEval(const std::string& expression);
    static std::string execute(const std::string& command, bool toString);
};

BatchBreakpointResult invoke(const std::string& arg, bool from_tty);
