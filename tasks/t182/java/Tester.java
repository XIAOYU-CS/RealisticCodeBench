package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

public class Tester {

    @Test
    public void testHashRecipeIdToPriceWithinDefaultRange() {
        double price = Answer.hashRecipeIdToPrice("recipe123");
        assertTrue(price >= 10);
        assertTrue(price <= 30);
    }

    @Test
    public void testHashRecipeIdToPriceSameRecipeId() {
        double price1 = Answer.hashRecipeIdToPrice("recipe123");
        double price2 = Answer.hashRecipeIdToPrice("recipe123");
        assertEquals(price1, price2, 0.01);
    }

    @Test
    public void testHashRecipeIdToPriceDifferentRecipeIds() {
        double price1 = Answer.hashRecipeIdToPrice("recipe123");
        double price2 = Answer.hashRecipeIdToPrice("recipe456");
        assertNotEquals(price1, price2, 0.01);
    }

    @Test
    public void testHashRecipeIdToPriceWithinCustomRange() {
        double minVal = 20;
        double maxVal = 50;
        double price = Answer.hashRecipeIdToPrice("recipe789", minVal, maxVal);
        assertTrue(price >= minVal);
        assertTrue(price <= maxVal);
    }

    @Test
    public void testHashRecipeIdToPriceLongRecipeId() {
        String longRecipeId = "recipe" + "A".repeat(1000);
        double price = Answer.hashRecipeIdToPrice(longRecipeId);
        assertTrue(price >= 10);
        assertTrue(price <= 30);
    }
}
