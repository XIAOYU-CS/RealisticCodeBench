describe('extractDateFromFilename', () => {
    test('should extract YYYY-MM-DD format dates', () => {
        expect(extractDateFromFilename("report_2023-12-31.pdf")).toBe("2023-12-31");
        expect(extractDateFromFilename("data_2023-01-01_backup.txt")).toBe("2023-01-01");
        expect(extractDateFromFilename("2023-02-29-invalid.txt")).toBeNull();
    });

    test('should extract YYYYMMDD format dates', () => {
        expect(extractDateFromFilename("backup_20231231.zip")).toBe("20231231");
        expect(extractDateFromFilename("20230101_initial.sql")).toBe("20230101");
        expect(extractDateFromFilename("file_20230229.dat")).toBeNull();
    });

    test('should extract DD-MM-YYYY and MM-DD-YYYY format dates', () => {
        expect(extractDateFromFilename("data_31-12-2023.csv")).toBe("31-12-2023");
        expect(extractDateFromFilename("log_12-31-2023.txt")).toBe("12-31-2023");
        expect(extractDateFromFilename("invalid_32-13-2023.doc")).toBeNull();
    });

    test('should extract DD/MM/YYYY and MM/DD/YYYY format dates', () => {
        expect(extractDateFromFilename("report_31/12/2023.pdf")).toBe("31/12/2023");
        expect(extractDateFromFilename("log_12/31/2023.txt")).toBe("12/31/2023");
        expect(extractDateFromFilename("error_31/13/2023.log")).toBeNull();
    });

    test('should return null when no valid date is found', () => {
        expect(extractDateFromFilename("no_date_here.txt")).toBeNull();
        expect(extractDateFromFilename("random_123456789_string.doc")).toBeNull();
        expect(extractDateFromFilename("invalid_99-99-9999.txt")).toBeNull();
        expect(extractDateFromFilename("almost_2023-13-01_close.txt")).toBeNull();
    });
});