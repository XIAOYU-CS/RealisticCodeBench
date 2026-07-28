#include <algorithm>
#include <cctype>
#include <cstdint>
#include <functional>
#include <iostream>
#include <map>
#include <sstream>
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
    explicit GdbError(const std::string& message) : std::runtime_error(message) {}
};

class GdbEnvironment {
public:
    static std::function<std::uint64_t(const std::string&)> parseAndEvalMock;
    static std::function<std::string(const std::string&, bool)> executeMock;

    static void clear() {
        memory.clear();
        breakpointCounter = 1;
        parseAndEvalMock = nullptr;
        executeMock = nullptr;
    }

    static void setMemory(const std::string& address, const std::string& value) {
        memory[address] = value;
    }

    static std::uint64_t parseAndEval(const std::string& expression) {
        if (parseAndEvalMock) {
            return parseAndEvalMock(expression);
        }
        return std::stoull(expression, nullptr, 0);
    }

    static std::string execute(const std::string& command, bool toString) {
        if (executeMock) {
            return executeMock(command, toString);
        }

        if (command.rfind("x/", 0) == 0) {
            const std::string address = command.substr(command.find(' ') + 1);
            const auto it = memory.find(address);
            return address + ": " + (it == memory.end() ? "0x0" : it->second);
        }

        if (command.rfind("break *", 0) == 0) {
            const std::string address = command.substr(7);
            return "Breakpoint " + std::to_string(breakpointCounter++) + " at " + address;
        }

        return "";
    }

private:
    static std::map<std::string, std::string> memory;
    static int breakpointCounter;
};

std::function<std::uint64_t(const std::string&)> GdbEnvironment::parseAndEvalMock;
std::function<std::string(const std::string&, bool)> GdbEnvironment::executeMock;
std::map<std::string, std::string> GdbEnvironment::memory;
int GdbEnvironment::breakpointCounter = 1;

static std::string toHex(std::uint64_t value) {
    std::ostringstream oss;
    oss << "0x" << std::hex << std::nouppercase << value;
    return oss.str();
}

BatchBreakpointResult invoke(const std::string& arg, bool from_tty) {
    std::istringstream iss(arg);
    std::vector<std::string> args;
    std::string token;
    
    while (iss >> token) {
        args.push_back(token);
    }
    
    if (args.empty()) {
        throw GdbError("Invalid arguments: Requires start_address [count] [step]");
    }
    
    std::uint64_t start_addr;
    int count = 53;
    int step = 8;
    
    try {
        start_addr = GdbEnvironment::parseAndEval(args[0]);
        if (args.size() > 1) {
            count = std::stoi(args[1]);
        }
        if (args.size() > 2) {
            step = std::stoi(args[2]);
        }
    } catch (const std::exception& e) {
        throw GdbError(std::string("Failed to parse arguments: ") + e.what());
    }
    
    if (step != 4 && step != 8) {
        throw GdbError("Unsupported step size " + std::to_string(step) + ". Use 4 (32-bit) or 8 (64-bit)");
    }

    if (count <= 0) {
        throw GdbError("Invalid count " + std::to_string(count) + ": must be positive");
    }
    
    BatchBreakpointResult results;
    
    for (int i = 0; i < count * step; i += step) {
        std::uint64_t current_addr = start_addr + static_cast<std::uint64_t>(i);
        try {
            const std::string mem_cmd = std::string("x/") + (step == 4 ? "w" : "g") + "x " + toHex(current_addr);
            std::string mem_result = GdbEnvironment::execute(mem_cmd, true);
            
            size_t colon_pos = mem_result.find(':');
            if (colon_pos == std::string::npos) {
                throw std::runtime_error("Unexpected memory output format: " + mem_result);
            }
            
            std::string target_hex = mem_result.substr(colon_pos + 1);
            target_hex.erase(std::remove_if(target_hex.begin(), target_hex.end(), isspace), target_hex.end());
            if (target_hex.rfind("0x", 0) != 0 && target_hex.rfind("0X", 0) != 0) {
                throw std::runtime_error("Invalid memory value format: " + target_hex);
            }
            std::uint64_t target_addr = std::stoull(target_hex, nullptr, 0);
            
            const std::string target_addr_hex = toHex(target_addr);
            std::string break_result = GdbEnvironment::execute("break *" + target_addr_hex, true);
            
            if (break_result.find("Breakpoint") == std::string::npos) {
                throw std::runtime_error("Breakpoint command failed: " + break_result);
            }
            
            std::istringstream break_iss(break_result);
            std::string bp_token;
            int bp_num;
            break_iss >> bp_token >> bp_num;
            results.success.emplace_back(target_addr_hex, bp_num);
            
        } catch (const std::exception& e) {
            results.failed.emplace_back(toHex(current_addr), e.what());
        }
    }
    
    std::cout << "\nBatch breakpoint summary:" << std::endl;
    std::cout << "  Successful: " << results.success.size() << " breakpoints" << std::endl;
    for (const auto& entry : results.success) {
        std::cout << "    Breakpoint #" << entry.second << " at " << entry.first << std::endl;
    }
    
    if (!results.failed.empty()) {
        std::cout << "  Failed: " << results.failed.size() << " operations" << std::endl;
        for (const auto& entry : results.failed) {
            std::cout << "    Address " << entry.first << ": " << entry.second << std::endl;
        }
    }
    
    return results;
}
