describe('getRelativeTime', () => {
    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date('2024-10-01'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should return "Today" for a message created today', () => {
        const messageDate = new Date();
        expect(getRelativeTime(messageDate)).toBe("Today");
    });

    test('should return "Yesterday" for a message created yesterday', () => {
        const messageDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
        expect(getRelativeTime(messageDate)).toBe("Yesterday");
    });

    test('should return weekday for a message created 6 days ago', () => {
        const messageDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 6);
        expect(getRelativeTime(messageDate)).toBe("Wednesday");
    });

    test('should return formatted date string for a message created exactly 7 days ago', () => {
        const messageDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
        expect(getRelativeTime(messageDate)).toBe("2024/09/24");
    });

    test('should return formatted date string for a message created 10 days ago', () => {
        const messageDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 10);
        expect(getRelativeTime(messageDate)).toBe("2024/09/21");
    });

    test('should return formatted date string for a message created 15 days ago', () => {
        const messageDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 15);
        expect(getRelativeTime(messageDate)).toBe("2024/09/16");
    });
});
