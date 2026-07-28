#include <string>
#include <vector>

struct MarkdownBlob {
    std::string content;
    std::string type;

    std::string text() const;
};

MarkdownBlob chat_logs_to_markdown_blob(
    const std::vector<std::string>& chat,
    const std::string& title = "ChatGPT Conversation");
