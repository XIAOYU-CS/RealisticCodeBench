describe('threadCountToFormattedString', () => {
    test('basic functionality with normal inputs', () => {
        expect(threadCountToFormattedString(1)).toBe("1 Thread");
        expect(threadCountToFormattedString(5)).toBe("5 Threads");
        expect(threadCountToFormattedString(0)).toBe("No Threads");
    });

    test('zero padding functionality', () => {
        expect(threadCountToFormattedString(5, 2, true)).toBe("05 Threads");
        expect(threadCountToFormattedString(5, 3, true)).toBe("005 Threads");
        expect(threadCountToFormattedString(5, 2, false)).toBe("5 Threads");
    });

    test('thousands separator functionality', () => {
        expect(threadCountToFormattedString(1000, 2, false, true)).toBe("1,000 Threads");
        const result = threadCountToFormattedString(1000, 2, true, true);
        expect(result).toBe("1,000 Threads");
    });

    test('custom text parameters', () => {
        expect(threadCountToFormattedString(0, 2, false, false, "Zero Threads")).toBe("Zero Threads");
        expect(threadCountToFormattedString(1, 2, false, false, "No Threads", "Proceso", "Procesos")).toBe("1 Proceso");
        expect(threadCountToFormattedString(3, 2, false, false, "No Threads", "Proceso", "Procesos")).toBe("3 Procesos");
    });

    test('error handling for invalid inputs', () => {
        expect(() => threadCountToFormattedString(-1)).toThrow();
        expect(() => threadCountToFormattedString("invalid")).toThrow();
        expect(() => threadCountToFormattedString(null)).toThrow();
        expect(() => threadCountToFormattedString(undefined)).toThrow();
    });
});