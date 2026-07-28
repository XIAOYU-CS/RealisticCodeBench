describe('arrayBufferToBase64', () => {
    test('basic conversion with different input types', () => {
        const testString = 'Hello World';
        const buffer = new TextEncoder().encode(testString);
        const arrayBuffer = buffer.buffer;
        const result = arrayBufferToBase64(arrayBuffer);
        const expected = typeof Buffer !== 'undefined'
            ? Buffer.from(testString).toString('base64')
            : btoa(testString);
        expect(result).toBe(expected);
        const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
        const resultUint8 = arrayBufferToBase64(uint8Array);
        const expectedUint8 = typeof Buffer !== 'undefined'
            ? Buffer.from('Hello').toString('base64')
            : btoa('Hello');
        expect(resultUint8).toBe(expectedUint8);
        const arrayInput: number[] = [72, 101, 108, 108, 111];
        const resultArray = arrayBufferToBase64(arrayInput);
        expect(resultArray).toBe(expectedUint8);
    });

    test('url safe conversion', () => {
        const testData = new Uint8Array([255, 254, 253]);
        const standardResult = arrayBufferToBase64(testData, false);
        const expectedStandard = typeof Buffer !== 'undefined'
            ? Buffer.from(testData).toString('base64')
            : btoa(String.fromCharCode.apply(null, Array.from(testData)));
        expect(standardResult).toBe(expectedStandard);
        const urlSafeResult = arrayBufferToBase64(testData, true);
        const expectedUrlSafe = standardResult.replace(/\+/g, '-').replace(/\//g, '_');
        expect(urlSafeResult).toBe(expectedUrlSafe);
        expect(urlSafeResult).not.toContain('+');
        expect(urlSafeResult).not.toContain('/');
    });

    test('padding control', () => {
        const testData1 = new Uint8Array([65]);
        const testData2 = new Uint8Array([65, 66]);
        const result1 = arrayBufferToBase64(testData1, false, true);
        expect(result1.endsWith('==')).toBe(true);
        const result1NoPadding = arrayBufferToBase64(testData1, false, false);
        expect(result1NoPadding).toBe('QQ');
        expect(result1NoPadding.endsWith('=')).toBe(false);
        const result2 = arrayBufferToBase64(testData2, false, true);
        expect(result2.endsWith('=')).toBe(true);
        expect(result2.endsWith('==')).toBe(false);
        const result2NoPadding = arrayBufferToBase64(testData2, false, false);
        expect(result2NoPadding).toBe('QUI');
        expect(result2NoPadding.endsWith('=')).toBe(false);
        const core1 = result1.replace(/=+$/, '');
        expect(core1).toBe(result1NoPadding);
    });

    test('empty input', () => {
        const emptyBuffer = new ArrayBuffer(0);
        const result = arrayBufferToBase64(emptyBuffer);
        expect(result).toBe('');
        const emptyUint8Array = new Uint8Array([]);
        const resultUint8 = arrayBufferToBase64(emptyUint8Array);
        expect(resultUint8).toBe('');
        const resultUrlSafe = arrayBufferToBase64(emptyUint8Array, true);
        expect(resultUrlSafe).toBe('');
        const resultNoPadding = arrayBufferToBase64(emptyUint8Array, false, false);
        expect(resultNoPadding).toBe('');
    });

    test('binary data and exceptions', () => {
        const binaryData = new Uint8Array([0, 1, 2, 3, 4, 5]);
        const result = arrayBufferToBase64(binaryData);
        const expected = typeof Buffer !== 'undefined'
            ? Buffer.from(binaryData).toString('base64')
            : btoa(String.fromCharCode.apply(null, Array.from(binaryData)));
        expect(result).toBe(expected);
    });
});