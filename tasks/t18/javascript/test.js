describe('TestPrintMemoryBits', () => {
    let originalConsoleLog;

    beforeEach(() => {
        const mockConsoleLog = jest.fn();
        console.log = mockConsoleLog;
        originalConsoleLog = console.log;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    it('should handle a single byte correctly', () => {
        const memorySection = new Uint8Array([0b10101010]);
        printMemoryBits(memorySection);
        expect(console.log).toHaveBeenCalledWith("10101010");
    });

    it('should handle multiple bytes correctly', () => {
        const memorySection = new Uint8Array([0b11001100, 0b11110000]);
        printMemoryBits(memorySection);
        expect(console.log).toHaveBeenCalledWith("11001100");
        expect(console.log).toHaveBeenCalledWith("11110000");
    });

    it('should handle all zeros correctly', () => {
        const memorySection = new Uint8Array([0b00000000]);
        printMemoryBits(memorySection);
        expect(console.log).toHaveBeenCalledWith("00000000");
    });

    it('should handle all ones correctly', () =>{
        const memorySection = new Uint8Array([0b11111111]);
        printMemoryBits(memorySection);
        expect(console.log).toHaveBeenCalledWith("11111111");
    });

    it('should handle an empty memory section', () => {
        const memorySection = new Uint8Array([]);
        printMemoryBits(memorySection);
        expect(console.log).not.toHaveBeenCalled();
    });
});
