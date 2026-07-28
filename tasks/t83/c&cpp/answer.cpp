#include <cstdlib>
#include <string>

namespace {

std::string normalize_encoding(std::string encoding) {
    for (char& ch : encoding) {
        if (ch == '_') {
            ch = '-';
        }
    }
    return encoding;
}

std::string shell_quote(const std::string& value) {
    std::string quoted = "'";
    for (char ch : value) {
        quoted += (ch == '\'') ? "'\\''" : std::string(1, ch);
    }
    quoted += "'";
    return quoted;
}

bool run_iconv(const std::string& input_file_path,
               const std::string& output_file_path,
               const std::string& original_encoding,
               const std::string& target_encoding) {
    std::string command = "iconv -f " + shell_quote(normalize_encoding(original_encoding)) +
                          " -t " + shell_quote(normalize_encoding(target_encoding)) + " " +
                          shell_quote(input_file_path) + " > " + shell_quote(output_file_path);
    return std::system(command.c_str()) == 0;
}

}  // namespace

bool convert_encoding(const std::string& input_file_path,
                      const std::string& output_file_path,
                      const std::string& original_encoding,
                      const std::string& target_encoding) {
    return run_iconv(input_file_path, output_file_path, original_encoding, target_encoding) ||
           run_iconv(input_file_path, output_file_path, target_encoding, target_encoding);
}
