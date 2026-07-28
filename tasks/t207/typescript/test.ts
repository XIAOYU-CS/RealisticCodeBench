describe('arrayBufferToUtf8String', () => {
    test('should return an empty string for an empty ArrayBuffer', () => {
        const buffer1 = new ArrayBuffer(0);
        const result = arrayBufferToUtf8String(buffer1);
        expect(result).toBe(''); // Expected: ""
    });

    test('should return "A" for a buffer containing the character "A"', () => {
        const buffer2 = new TextEncoder().encode("A").buffer;
        const result = arrayBufferToUtf8String(buffer2);
        expect(result).toBe('A'); // Expected: "A"
    });

    test('should return "Hello" for a buffer containing the string "Hello"', () => {
        const buffer3 = new TextEncoder().encode("Hello").buffer;
        const result = arrayBufferToUtf8String(buffer3);
        expect(result).toBe('Hello'); // Expected: "Hello"
    });

        test('should return the correct string for a buffer containing multiple characters', () => {
        const buffer4 = new TextEncoder().encode("Hello, World!").buffer;
        const result = arrayBufferToUtf8String(buffer4);
        expect(result).toBe('Hello, World!'); // Expected: "Hello, World!"
    });


    test('should not modify the input buffer', () => {
        const input = "Test input";
        const buffer8 = new TextEncoder().encode(input).buffer;
        arrayBufferToUtf8String(buffer8);
        const result = new TextDecoder().decode(buffer8);
        expect(result).toBe(input); // Check if the buffer content remains unchanged
    });

});