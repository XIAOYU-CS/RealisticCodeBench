function dateRangeString(startDate: string, endDate: string): string {
    const parseDate = (value: string): Date => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            throw new Error("Date must be in 'YYYY-MM-DD' format.");
        }
        const date = new Date(`${value}T00:00:00Z`);
        if (Number.isNaN(date.getTime())) {
            throw new Error("Date must be in 'YYYY-MM-DD' format.");
        }
        return date;
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    if (start > end) {
        throw new Error("start_date cannot be after end_date.");
    }

    const month = (date: Date): string =>
        date.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
    const startMonth = month(start);
    const endMonth = month(end);
    const startDay = start.getUTCDate();
    const endDay = end.getUTCDate();
    const startYear = start.getUTCFullYear();
    const endYear = end.getUTCFullYear();

    if (startYear !== endYear) {
        return `${startMonth} ${startDay}, ${startYear} to ${endMonth} ${endDay}, ${endYear}`;
    }
    if (startMonth === endMonth) {
        return `${startMonth} ${startDay} to ${endDay}, ${startYear}`;
    }
    return `${startMonth} ${startDay}, ${startYear} to ${endMonth} ${endDay}, ${startYear}`;
}
