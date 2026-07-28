interface TestObj {
    name: string;
    [key: string]: any;
}

class TestObj implements TestObj {
    constructor(name: string, props: Record<string, any> = {}) {
        this.name = name;
        Object.assign(this, props);
    }
}

describe('allEqualAttr', () => {
    test('should return true for empty list (vacuous truth)', () => {
        const result = allEqualAttr<TestObj>([], 'value');
        expect(result).toBe(true);
    });

    test('should return true when all objects have same attribute values', () => {
        const obj1 = new TestObj("obj1", { value: 10 });
        const obj2 = new TestObj("obj2", { value: 10 });
        const obj3 = new TestObj("obj3", { value: 10 });

        const result = allEqualAttr<TestObj>([obj1, obj2, obj3], 'value');
        expect(result).toBe(true);
    });

    test('should return false when objects have different attribute values', () => {
        const obj1 = new TestObj("obj1", { value: 10 });
        const obj2 = new TestObj("obj2", { value: 20 });
        const obj3 = new TestObj("obj3", { value: 10 });

        const result = allEqualAttr<TestObj>([obj1, obj2, obj3], 'value');
        expect(result).toBe(false);
    });

    test('should handle missing attributes with default values', () => {
        const obj1 = new TestObj("obj1", { value: 5 });
        const obj2 = new TestObj("obj2");
        const obj3 = new TestObj("obj3", { value: 5 });

        const result = allEqualAttr<TestObj>([obj1, obj2, obj3], 'value', null, 5);
        expect(result).toBe(true);
    });

    test('should work with custom comparator function', () => {
        const obj1 = new TestObj("obj1", { value: 10 });
        const obj2 = new TestObj("obj2", { value: 12 });
        const obj3 = new TestObj("obj3", { value: 8 });

        const withinRange = (a: number, b: number): boolean => {
            return Math.abs(a - b) <= 5;
        };

        const result = allEqualAttr<TestObj>([obj1, obj2, obj3], 'value', withinRange);
        expect(result).toBe(true);
    });
});