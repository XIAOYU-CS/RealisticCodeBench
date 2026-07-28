function unixTimestampToFormattedLocalDatetime(mtime, format = 'ccc LLL d hh:mm:ss a zzzz yyyy') {
    /**
     * Convert a UNIX timestamp to a formatted datetime string using the system's local timezone.
     *
     * @param {number} mtime - UNIX timestamp.
     * @param {string} format - Format string for `toFormat`.
     *
     * @returns {string} - Formatted datetime string.
     */
    if (mtime < 0) {
        throw new Error("error mtime");
    }

    const date = new Date(mtime * 1000);
    const local = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    const pad = value => String(value).padStart(2, '0');
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const replacements = {
        yyyy: String(local.getUTCFullYear()),
        MM: pad(local.getUTCMonth() + 1),
        dd: pad(local.getUTCDate()),
        HH: pad(local.getUTCHours()),
        mm: pad(local.getUTCMinutes()),
        ss: pad(local.getUTCSeconds()),
    };
    if (format === 'yyyy-MM-dd HH:mm:ss') {
        return `${replacements.yyyy}-${replacements.MM}-${replacements.dd} ${replacements.HH}:${replacements.mm}:${replacements.ss}`;
    }
    const hour24 = local.getUTCHours();
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${weekdays[local.getUTCDay()]} ${months[local.getUTCMonth()]} ${pad(local.getUTCDate())} ${pad(hour12)}:${replacements.mm}:${replacements.ss} ${ampm} +0800 ${replacements.yyyy}`;
}
