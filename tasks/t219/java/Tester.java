package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void shouldReturnFilenameUnchangedIfUnderMaxLength() {
        assertEquals("file.txt", truncateFilenameWithEllipsis("file.txt", 10));
    }

    @Test
    public void shouldTruncateAndAppendIfFilenameExceedsMaxLength() {
        assertEquals("verylongfi***.txt", truncateFilenameWithEllipsis("verylongfilename.txt", 10));
    }

    @Test
    public void shouldPreserveFileExtensionAfterCompression() {
        assertEquals("docum***.pdf", truncateFilenameWithEllipsis("document.pdf", 5));
    }

    @Test
    public void shouldLeaveBasenameUnchangedWhenMatchesMaxLength() {
        assertEquals("report.csv", truncateFilenameWithEllipsis("report.csv", 6));
    }

    @Test
    public void shouldTruncateAndAppendIfFilenameExceeds() {
        assertEquals("sh***.mp3", truncateFilenameWithEllipsis("short.mp3", 2));
    }
}
