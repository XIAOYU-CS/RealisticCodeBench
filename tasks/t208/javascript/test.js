describe('convertBase64ToArrayBuffer function', () => {
    // Test Case 1
    test('should decode "SGVsbG8sIFdvcmxkIQ==" to "Hello, World!"', () => {
        const base64 = "SGVsbG8sIFdvcmxkIQ==";
        const expected = "Hello, World!";
        const arrayBuffer = convertBase64ToArrayBuffer(base64);
        const result = new TextDecoder().decode(arrayBuffer);
        expect(result).toBe(expected);
    });

    // Test Case 2
    test('should decode "U29tZSB0ZXh0IHdpdGggc3BhcmluZyBhbmQgd29ya2luZyE=" to "Some text with sparing and working!"', () => {
        const base64 = "U29tZSB0ZXh0IHdpdGggc3BhcmluZyBhbmQgd29ya2luZyE=";
        const expected = "Some text with sparing and working!";
        const arrayBuffer = convertBase64ToArrayBuffer(base64);
        const result = new TextDecoder().decode(arrayBuffer);
        expect(result).toBe(expected);
    });

    // Test Case 3
    test('should decode "QmFzZTY0IGVuY29kaW5nIGlzIGEgY29tbW9ubG9nIEZvciBiaW5hcnkgZGF0YQ==" to "Base64 encoding is a common log For binary data"', () => {
        const base64 = "QmFzZTY0IGVuY29kaW5nIGlzIGEgY29tbW9ubG9nIEZvciBiaW5hcnkgZGF0YQ==";
        const expected = "Base64 encoding is a commonlog For binary data";
        const arrayBuffer = convertBase64ToArrayBuffer(base64);
        const result = new TextDecoder().decode(arrayBuffer);
        expect(result).toBe(expected);
    });

    // Test Case 4
    test('should decode "R2l2ZSBtZSBhbG9uZyBhIHBhdGggdG8gY29tcGxldGUgc3RhcnQgcGFnZS4=" to "Give me along a path to complete start page."', () => {
        const base64 = "R2l2ZSBtZSBhbG9uZyBhIHBhdGggdG8gY29tcGxldGUgc3RhcnQgcGFnZS4=";
        const expected = "Give me along a path to complete start page.";
        const arrayBuffer = convertBase64ToArrayBuffer(base64);
        const result = new TextDecoder().decode(arrayBuffer);
        expect(result).toBe(expected);
    });

    test('should decode an empty string to an empty ArrayBuffer', () => {
        const arrayBuffer = convertBase64ToArrayBuffer("");
        expect(arrayBuffer.byteLength).toBe(0);
    });

    test('should preserve non-text binary bytes', () => {
        const arrayBuffer = convertBase64ToArrayBuffer("AAECAwQF");
        expect(Array.from(new Uint8Array(arrayBuffer))).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test('should throw for malformed Base64 input', () => {
        expect(() => convertBase64ToArrayBuffer("%%%")).toThrow();
    });
});
