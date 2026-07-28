describe('TestGetLocalIP', () => {
    const mockExec = jest.spyOn(childProcess, 'exec') as jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should find a local IP', async () => {
        mockExec.mockResolvedValueOnce({ stdout: '192.168.1.10\n' });
        const result = await getWindowsLocalIp();
        expect(result).toBe('192.168.1.10');
    });

    it('should return null when no local IP is found', async () => {
        mockExec.mockResolvedValueOnce({ stdout: '10.0.0.5\n' });
        const result = await getWindowsLocalIp();
        expect(result).toBeNull();
    });

    it('should return the first local IP when multiple IPs are found', async () => {
        mockExec.mockResolvedValueOnce({ stdout: '10.0.0.5\n192.168.1.10\n' });
        const result = await getWindowsLocalIp();
        expect(result).toBe('192.168.1.10');
    });

    it('should return null when the command fails', async () => {
        mockExec.mockRejectedValueOnce(new Error('Command failed'));
        const result = await getWindowsLocalIp();
        expect(result).toBeNull();
    });

    it('should return null when an unexpected error occurs', async () => {
        mockExec.mockRejectedValueOnce(new Error('Unexpected error'));
        const result = await getWindowsLocalIp();
        expect(result).toBeNull();
    });
});
