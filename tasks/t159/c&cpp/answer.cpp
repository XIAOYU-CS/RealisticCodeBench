#include <ctime>
#include <iomanip>
#include <sstream>
#include <string>
#include <vector>

#include "signature.cpp"

std::string MarkdownBlob::text() const {
    return content;
}

MarkdownBlob chat_logs_to_markdown_blob(
    const std::vector<std::string>& chat,
    const std::string& title) {
    std::ostringstream markdown;
    markdown << "# " << title << "\n\n";

    for (std::size_t i = 0; i < chat.size(); ++i) {
        markdown << (i % 2 == 0 ? "**Human:**\n" : "**Assistant:**\n")
                 << chat[i] << "\n\n***\n\n";
    }

    std::time_t now = std::time(nullptr);
    std::tm local_time{};
#if defined(_WIN32)
    localtime_s(&local_time, &now);
#else
    localtime_r(&now, &local_time);
#endif
    markdown << "Exported on " << std::put_time(&local_time, "%Y-%m-%d %H:%M:%S") << ".";

    return {markdown.str(), "text/markdown"};
}
