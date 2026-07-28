/**
 * Adds padding characters to a multi-line string, supporting multiple directions and custom padding content
 *
 * @param string - Input multi-line string
 * @param n - Padding quantity (padding length for each side)
 * @param char - Padding character (space by default), can use a single character or string
 * @param side - Padding direction
 * @returns The padded multi-line string
 */
function padString(
    string: string,
    n: number = 4,
    char: string = ' ',
    side: 'left' | 'right' | 'both' = 'left'
): string {}