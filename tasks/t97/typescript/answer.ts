function compressWhitespace(inputString: string): string {
    // Split the input string by whitespace and join with a single space
    return inputString.trim().split(/\s+/).join(' ');
}
