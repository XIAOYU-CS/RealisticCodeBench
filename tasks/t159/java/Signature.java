import java.util.List;

public static class MarkdownBlob {
    public final String type = "text/markdown";

    public MarkdownBlob(String text) {}

    public String text() {}
}

/**
 * Convert chat log lines into a markdown blob using a default title.
 *
 * @param chat alternating chat messages
 * @return a markdown blob
 */
public static MarkdownBlob chatLogsToMarkdownBlob(List<String> chat) {}

/**
 * Convert chat log lines into a markdown blob.
 *
 * @param chat alternating chat messages
 * @param title markdown title
 * @return a markdown blob
 */
public static MarkdownBlob chatLogsToMarkdownBlob(List<String> chat, String title) {}
