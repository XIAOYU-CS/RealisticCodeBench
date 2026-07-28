import org.junit.Test;
import java.util.Arrays;
import static org.junit.Assert.*;

public class Tester {
    @Test
    public void includesDefaultTitle() {
        Answer.MarkdownBlob blob = Answer.chatLogsToMarkdownBlob(Arrays.asList("Hello", "Hi there!"));
        assertTrue(blob.text().startsWith("# ChatGPT Conversation\n\n**Human:**\nHello\n\n***\n\n**Assistant:**\nHi there!\n\n***\n\nExported on "));
    }

    @Test
    public void includesCustomTitle() {
        Answer.MarkdownBlob blob = Answer.chatLogsToMarkdownBlob(Arrays.asList("How are you?", "I'm doing well, thank you!"), "Friendly Chat");
        assertTrue(blob.text().startsWith("# Friendly Chat\n\n**Human:**\nHow are you?\n\n***\n\n**Assistant:**\nI'm doing well, thank you!\n\n***\n\nExported on "));
    }

    @Test
    public void alternatesSpeakers() {
        Answer.MarkdownBlob blob = Answer.chatLogsToMarkdownBlob(Arrays.asList("Question?", "Answer.", "Another question?", "Another answer."));
        assertTrue(blob.text().contains("**Human:**\nQuestion?\n\n***\n\n**Assistant:**\nAnswer.\n\n***\n\n**Human:**\nAnother question?\n\n***\n\n**Assistant:**\nAnother answer.\n\n***\n\nExported on "));
    }

    @Test
    public void includesTimestamp() {
        Answer.MarkdownBlob blob = Answer.chatLogsToMarkdownBlob(Arrays.asList("What's the time?", "It's now."));
        assertTrue(blob.text().matches("(?s).*Exported on \\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\."));
    }

    @Test
    public void hasMarkdownType() {
        Answer.MarkdownBlob blob = Answer.chatLogsToMarkdownBlob(Arrays.asList("This is a test.", "Yes, it is."));
        assertEquals("text/markdown", blob.type);
    }
}
