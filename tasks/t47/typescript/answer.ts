import { DateTime } from 'luxon';

function unixTimestampToFormattedLocalDatetime(mtime: number, format: string = 'ccc LLL dd hh:mm:ss a ZZZ yyyy'): string {
    /**
     * Convert a UNIX timestamp to a formatted datetime string using the system's local timezone.
     *
     * @param mtime - UNIX timestamp.
     * @param format - Format string for `toFormat`.
     * @returns Formatted datetime string.
     */
    if (mtime < 0) {
        throw new Error('error mtime');
    }

    try {
        // Convert the UNIX timestamp to a datetime object with timezone
        const dt = DateTime.fromMillis(mtime * 1000).setZone('local');

        // Return the formatted datetime string
        return dt.toFormat(toLuxonFormat(format), { locale: 'en-US' });
    } catch (e) {
        // Handle any other unexpected errors
        throw new Error(`Error formatting the datetime: ${e}`);
    }
}

function toLuxonFormat(format: string): string {
    const strftimeTokens: Record<string, string> = {
        '%a': 'ccc',
        '%A': 'cccc',
        '%b': 'LLL',
        '%B': 'LLLL',
        '%d': 'dd',
        '%m': 'MM',
        '%y': 'yy',
        '%Y': 'yyyy',
        '%H': 'HH',
        '%I': 'hh',
        '%M': 'mm',
        '%S': 'ss',
        '%p': 'a',
        '%z': 'ZZZ',
        '%Z': 'z',
        '%%': "'%'",
    };
    return format.replace(/%[aAbBdmyYHIMSpzZ%]/g, token => strftimeTokens[token] ?? token);
}
