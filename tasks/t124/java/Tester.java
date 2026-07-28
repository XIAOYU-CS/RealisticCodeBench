package org.real.temp;

import org.junit.Test;
import org.junit.Assert;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {
    
    @Test
    public void testYyyyMmDdFormat() {
        assertEquals("2023-12-31", Answer.extractDateFromFilename("report_2023-12-31.pdf"));
        assertEquals("2023-01-01", Answer.extractDateFromFilename("data_2023-01-01_backup.txt"));
        assertNull(Answer.extractDateFromFilename("2023-02-29-invalid.txt"));
    }
    
    @Test
    public void testYyyyMmDdCompactFormat() {
        assertEquals("20231231", Answer.extractDateFromFilename("backup_20231231.zip"));
        assertEquals("20230101", Answer.extractDateFromFilename("20230101_initial.sql"));
        assertNull(Answer.extractDateFromFilename("file_20230229.dat"));
    }
    
    @Test
    public void testDdMmYyyyAndMmDdYyyyFormats() {
        assertEquals("31-12-2023", Answer.extractDateFromFilename("data_31-12-2023.csv"));
        assertEquals("12-31-2023", Answer.extractDateFromFilename("log_12-31-2023.txt"));
        assertNull(Answer.extractDateFromFilename("invalid_32-13-2023.doc"));
    }
    
    @Test
    public void testDdMmYyyyAndMmDdYyyySlashFormats() {
        assertEquals("31/12/2023", Answer.extractDateFromFilename("report_31/12/2023.pdf"));
        assertEquals("12/31/2023", Answer.extractDateFromFilename("log_12/31/2023.txt"));
        assertNull(Answer.extractDateFromFilename("error_31/13/2023.log"));
    }
    
    @Test
    public void testNoValidDateFound() {
        assertNull(Answer.extractDateFromFilename("no_date_here.txt"));
        assertNull(Answer.extractDateFromFilename("random_123456789_string.doc"));
        assertNull(Answer.extractDateFromFilename("invalid_99-99-9999.txt"));
        assertNull(Answer.extractDateFromFilename("almost_2023-13-01_close.txt"));
    }
}