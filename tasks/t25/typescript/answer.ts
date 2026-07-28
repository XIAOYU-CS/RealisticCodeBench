import { DateTime } from 'luxon';

function getCurrentDateInfo(testDate?: Date | DateTime): { year: number; month: string; week_of_the_month: number; day_of_the_week: string } {
    const today = testDate instanceof Date
        ? testDate
        : DateTime.isDateTime(testDate)
            ? testDate.toJSDate()
            : new Date();

    const year = today.getFullYear();
    const month = DateTime.fromJSDate(today).toFormat('MMMM');
    const dayOfWeek = DateTime.fromJSDate(today).toFormat('cccc');

    // Calculate the week of the month
    const firstDayOfMonth = new Date(year, today.getMonth(), 1);
    const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7;
    const weekOfMonth = Math.ceil((today.getDate() + firstDayWeekday) / 7);

    return {
        year,
        month,
        week_of_the_month: weekOfMonth,
        day_of_the_week: dayOfWeek
    };
}
