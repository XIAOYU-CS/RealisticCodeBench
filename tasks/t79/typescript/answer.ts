function isCompliantIP(ip: string): boolean {
    /**
     * Check whether the IP address is a legal IP address.
     *
     * @param {string} ip - The IP address in string format.
     * @returns {boolean} - True if the IP is compliant, False otherwise.
     */

    // Regular expression to match a valid IPv4 address
    const ipRegex = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
    if (!ipRegex.test(ip)) {
        return false;
    }

    const [first, second] = ip.split('.').map(Number);
    return first === 10 ||
        (first === 172 && second >= 16 && second <= 31) ||
        (first === 192 && second === 168);
}
