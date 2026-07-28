import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class Tester {
    @Test
    public void testValidCalculationWithIntegerValues() {
        double result = Answer.computeFinalPriceAfterDiscount("100", "20");
        assertEquals(80.0, result, 0.01);
    }

    @Test
    public void testValidCalculationWithDecimalValues() {
        double result = Answer.computeFinalPriceAfterDiscount("99.99", "15.5");
        assertEquals(84.49, result, 0.01);
    }

    @Test
    public void testZeroDiscount() {
        double result = Answer.computeFinalPriceAfterDiscount("50.00", "0");
        assertEquals(50.00, result, 0.01);
    }

    @Test
    public void testFullDiscount() {
        double result = Answer.computeFinalPriceAfterDiscount("75.50", "100");
        assertEquals(0.0, result, 0.01);
    }

    @Test
    public void testRejectsInvalidPriceOrDiscount() {
        try {
            Answer.computeFinalPriceAfterDiscount("abc", "10");
            throw new AssertionError("Expected invalid price to throw");
        } catch (IllegalArgumentException expected) {
        }

        try {
            Answer.computeFinalPriceAfterDiscount("50", "101");
            throw new AssertionError("Expected invalid discount to throw");
        } catch (IllegalArgumentException expected) {
        }
    }
}
