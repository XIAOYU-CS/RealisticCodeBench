#include <iostream>
#include <string>
#include <iomanip>

std::string format_post_count(int count) {
    if (count == 0) {
        return "No Posts";
    } else {
        std::string postCount = std::to_string(count);
        if (postCount.length() < 2) {
            postCount.insert(0, 2 - postCount.length(), '0');
        }
        std::string postWord = (count == 1) ? "Post" : "Posts"; // Singular or plural
        return postCount + " " + postWord; // Correctly formatted string
    }
}
