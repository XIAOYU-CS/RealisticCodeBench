
#include <string>
#include <unordered_map>
#include <cctype>

std::string enhanced_text_processor(
    const std::string& text,
    bool keep_alnum = true,
    const std::string& case_transform = "upper",
    const std::unordered_map<char, std::string>& replace_map = std::unordered_map<char, std::string>()
) {
    std::string processed_text;
    
    // Step 1: Character replacement
    for (char c : text) {
        auto it = replace_map.find(c);
        if (it != replace_map.end()) {
            processed_text += it->second;
        } else {
            processed_text += c;
        }
    }
    
    // Step 2: Alphanumeric filtering
    if (keep_alnum) {
        std::string filtered_chars;
        for (char c : processed_text) {
            if (isalnum(c)) {
                filtered_chars += c;
            }
        }
        processed_text = filtered_chars;
    }
    
    // Step 3: Case transformation
    if (case_transform == "upper") {
        for (char& c : processed_text) {
            c = toupper(c);
        }
    } else if (case_transform == "lower") {
        for (char& c : processed_text) {
            c = tolower(c);
        }
    }
    
    return processed_text;
}