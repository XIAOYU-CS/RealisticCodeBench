describe('hashRecipeIdToPrice', () => {
    test('should return a number within the default range for a given recipe ID', () => {
        const price: number = hashRecipeIdToPrice('recipe123');
        expect(price).toBeGreaterThanOrEqual(10);
        expect(price).toBeLessThanOrEqual(30);
    });

    test('should return the same price for the same recipe ID', () => {
        const price1: number = hashRecipeIdToPrice('recipe123');
        const price2: number = hashRecipeIdToPrice('recipe123');
        expect(price1).toBe(price2);
    });

    test('should return different prices for different recipe IDs', () => {
        const price1: number = hashRecipeIdToPrice('recipe123');
        const price2: number = hashRecipeIdToPrice('recipe456');
        expect(price1).not.toBe(price2);
    });

    test('should return a price within a custom range', () => {
        const minVal: number = 20;
        const maxVal: number = 50;
        const price: number = hashRecipeIdToPrice('recipe789', minVal, maxVal);
        expect(price).toBeGreaterThanOrEqual(minVal);
        expect(price).toBeLessThanOrEqual(maxVal);
    });

    test('should handle very long recipe IDs without error', () => {
        const longRecipeId: string = 'recipe' + 'A'.repeat(1000);
        const price: number = hashRecipeIdToPrice(longRecipeId);
        expect(price).toBeGreaterThanOrEqual(10);
        expect(price).toBeLessThanOrEqual(30);
    });
});