import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Answer {
    public static class MarkdownBlob {
        public final String type = "text/markdown";
        private final String text;

        public MarkdownBlob(String text) {
            this.text = text;
        }

        public String text() {
            return text;
        }
    }

    public static MarkdownBlob chatLogsToMarkdownBlob(List<String> chat) {
        return chatLogsToMarkdownBlob(chat, "ChatGPT Conversation");
    }

    public static MarkdownBlob chatLogsToMarkdownBlob(List<String> chat, String title) {
        StringBuilder markdown = new StringBuilder("# ").append(title).append("\n\n");

        for (int i = 0; i < chat.size(); i++) {
            String speaker = i % 2 == 0 ? "Human" : "Assistant";
            markdown.append("**").append(speaker).append(":**\n")
                    .append(chat.get(i)).append("\n\n***\n\n");
        }

        LocalDateTime now = LocalDateTime.now();
        markdown.append("Exported on ")
                .append(now.format(DateTimeFormatter.ISO_LOCAL_DATE))
                .append(" ")
                .append(now.format(DateTimeFormatter.ofPattern("HH:mm:ss")))
                .append(".");

        return new MarkdownBlob(markdown.toString());
    }
}
