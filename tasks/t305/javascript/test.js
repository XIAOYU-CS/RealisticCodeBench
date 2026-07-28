describe('detectPhoneNumbers', () => {
    test('chinese mobile numbers', () => {
        const text = "我的手机号是13812345678，办公室电话是+8613987654321";
        const result = detectPhoneNumbers(text, "cn");

        expect(result).toHaveLength(2);
        const cnMobileNumbers = result.filter(item => item.type === "cn_mobile");
        expect(cnMobileNumbers).toHaveLength(2);
    });

    test('us phone numbers', () => {
        const text = "Contact us at +1 (555) 123-4567 or +1-555-123-4568";
        const result = detectPhoneNumbers(text, "us");

        expect(result).toHaveLength(2);
        result.forEach(item => {
            expect(item.type).toBe("international");
            expect(item.number).toMatch(/^\+1/);
        });
    });

    test('custom pattern', () => {
        const text = "Emergency: 911, Info: 411, Service: 311";
        const customPattern = "\\b(911|411|311)\\b";
        const result = detectPhoneNumbers(text, "global", customPattern);

        expect(result).toHaveLength(3);
        const numbers = result.map(item => item.number);
        expect(numbers).toContain("911");
        expect(numbers).toContain("411");
        expect(numbers).toContain("311");
    });

    test('default region detects global number', () => {
        const text = "Reach the London desk at +44 207 123 4567.";
        const result = detectPhoneNumbers(text);

        expect(result).toEqual([{number: "+44 207 123 4567", type: "international"}]);
    });

    test('no phone numbers', () => {
        const text = "This text contains no phone numbers at all.";
        const result = detectPhoneNumbers(text, "global");

        expect(result).toHaveLength(0);
        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual([]);
    });
});
