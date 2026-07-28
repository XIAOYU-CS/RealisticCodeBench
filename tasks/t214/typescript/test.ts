describe('calculateTimeAgo', () => {
    test('should return "1 second ago" for a date 1 second ago', () => {
        const oneSecondAgo = new Date(new Date().getTime() - 1000);
        // @ts-ignore
        expect(calculateTimeAgo(oneSecondAgo)).toBe('1 second ago');
    });

    test('should return "5 minutes ago" for a date 5 minutes ago', () => {
        const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60 * 1000);
        // @ts-ignore
        expect(calculateTimeAgo(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    test('should return "2 hours ago" for a date 2 hours ago', () => {
        const twoHoursAgo = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);
        // @ts-ignore
        expect(calculateTimeAgo(twoHoursAgo)).toBe('2 hours ago');
    });

    test('should return "3 days ago" for a date 3 days ago', () => {
        const threeDaysAgo = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000);
        // @ts-ignore
        expect(calculateTimeAgo(threeDaysAgo)).toBe('3 days ago');
    });

    test('should return "1 week ago" for a date 7 days ago', () => {
        const oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        // @ts-ignore
        expect(calculateTimeAgo(oneWeekAgo)).toBe('1 week ago');
    });

});
