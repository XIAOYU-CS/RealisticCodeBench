function reformatDateString(dateStr: string): string | null {
    try {
        const months: Record<string, string> = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
            Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        const match = dateStr.match(/^[A-Z][a-z]{2}, (\d{2}) ([A-Z][a-z]{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) [+-]\d{4} \([A-Z]+\)$/);

        if (!match || !(match[2] in months)) {
            console.log("Error parsing date: Invalid date string");
            return null;
        }

        const [, day, monthName, year, hours, minutes, seconds] = match;
        const month = months[monthName];
        const dateObject = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);

        if (
            isNaN(dateObject.getTime()) ||
            dateObject.getUTCFullYear() !== Number(year) ||
            dateObject.getUTCMonth() + 1 !== Number(month) ||
            dateObject.getUTCDate() !== Number(day) ||
            dateObject.getUTCHours() !== Number(hours) ||
            dateObject.getUTCMinutes() !== Number(minutes) ||
            dateObject.getUTCSeconds() !== Number(seconds)
        ) {
            console.log("Error parsing date: Invalid date string");
            return null;
        }

        // Format the date string
        const formattedDate: string = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;

        return formattedDate;
    } catch (error) {
        console.log(`Error parsing date: ${error}`);
        return null;
    }
}
