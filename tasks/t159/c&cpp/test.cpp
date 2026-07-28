#include <regex>
#include <string>
#include <vector>

TEST_CASE("chat_logs_to_markdown_blob") {
    SECTION("uses the default title") {
        MarkdownBlob blob = chat_logs_to_markdown_blob({"Hello", "Hi there!"});
        REQUIRE(blob.text().find("# ChatGPT Conversation\n\n") == 0);
        REQUIRE(blob.text().find("**Human:**\nHello\n\n***\n\n") != std::string::npos);
        REQUIRE(blob.text().find("**Assistant:**\nHi there!\n\n***\n\n") != std::string::npos);
    }

    SECTION("uses a custom title") {
        MarkdownBlob blob = chat_logs_to_markdown_blob({"How are you?", "Fine."}, "Friendly Chat");
        REQUIRE(blob.text().find("# Friendly Chat\n\n") == 0);
    }

    SECTION("alternates speakers") {
        MarkdownBlob blob = chat_logs_to_markdown_blob({
            "Question?",
            "Answer.",
            "Another question?",
            "Another answer."
        });
        REQUIRE(blob.text().find(
            "**Human:**\nQuestion?\n\n***\n\n"
            "**Assistant:**\nAnswer.\n\n***\n\n"
            "**Human:**\nAnother question?\n\n***\n\n"
            "**Assistant:**\nAnother answer.\n\n***\n\n") != std::string::npos);
    }

    SECTION("handles an empty chat") {
        MarkdownBlob blob = chat_logs_to_markdown_blob({});
        REQUIRE(blob.text().find("# ChatGPT Conversation\n\nExported on ") == 0);
    }

    SECTION("adds a timestamp") {
        MarkdownBlob blob = chat_logs_to_markdown_blob({"Now?"});
        REQUIRE(std::regex_search(
            blob.text(),
            std::regex("Exported on [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\\.$")));
    }

    SECTION("returns a markdown blob type") {
        MarkdownBlob blob = chat_logs_to_markdown_blob({"This is a test."});
        REQUIRE(blob.type == "text/markdown");
    }
}
