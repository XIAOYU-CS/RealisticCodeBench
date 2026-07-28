import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void testConstantFunction() {
        assertEquals(1.0, Answer.trapezoidalIntegral(x -> 1.0, 0.0, 1.0, 100), 1e-6);
    }

    @Test
    public void testLinearFunction() {
        assertEquals(0.5, Answer.trapezoidalIntegral(x -> x, 0.0, 1.0, 100), 1e-6);
    }

    @Test
    public void testQuadraticFunction() {
        assertEquals(1.0 / 3.0, Answer.trapezoidalIntegral(x -> x * x, 0.0, 1.0, 1000), 1e-6);
    }

    @Test
    public void testSineFunction() {
        assertEquals(2.0, Answer.trapezoidalIntegral(Math::sin, 0.0, Math.PI, 1000), 1e-3);
    }

    @Test
    public void testExponentialFunction() {
        assertEquals(Math.E - 1.0, Answer.trapezoidalIntegral(Math::exp, 0.0, 1.0, 1000), 1e-6);
    }
}
