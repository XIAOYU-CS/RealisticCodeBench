#include <string>

int count_letters(const std::string& str) {
    int count = 0;
    for (char ch : str) {
        if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
            count++;
        }
    }
    return count;
}
