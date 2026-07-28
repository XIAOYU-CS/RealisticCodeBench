package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.Collections;

import org.real.temp.Answer.ListES;
import org.real.temp.Answer.Trans;

public class Tester {

    @Test
    public void testMoveRightWithNonEmptyRightTape() {
        ListES current = new ListES(Arrays.asList(1, 2), Arrays.asList(3, 4), 0, 0);
        Trans trans = new Trans(1, 1, 5);

        ListES result = Answer.listESStepPrime(trans, current);

        assertEquals(new ListES(Arrays.asList(5, 1, 2), Collections.singletonList(4), 3, 1), result);
    }

    @Test
    public void testMoveRightWithEmptyRightTape() {
        ListES current = new ListES(Collections.singletonList(1), Collections.<Integer>emptyList(), 0, 0);
        Trans trans = new Trans(2, 1, 2);

        ListES result = Answer.listESStepPrime(trans, current);

        assertEquals(new ListES(Arrays.asList(2, 1), Collections.<Integer>emptyList(), Answer.SIGMA0, 2), result);
    }

    @Test
    public void testMoveLeftWithNonEmptyLeftTape() {
        ListES current = new ListES(Arrays.asList(3, 4), Collections.singletonList(5), 0, 0);
        Trans trans = new Trans(3, -1, 6);

        ListES result = Answer.listESStepPrime(trans, current);

        assertEquals(new ListES(Collections.singletonList(4), Arrays.asList(6, 5), 3, 3), result);
    }

    @Test
    public void testMoveLeftWithEmptyLeftTape() {
        ListES current = new ListES(Collections.<Integer>emptyList(), Arrays.asList(7, 8), 0, 0);
        Trans trans = new Trans(4, -1, 9);

        ListES result = Answer.listESStepPrime(trans, current);

        assertEquals(new ListES(Collections.<Integer>emptyList(), Arrays.asList(9, 7, 8), Answer.SIGMA0, 4), result);
    }

    @Test
    public void testNoMovement() {
        ListES current = new ListES(Collections.singletonList(10), Collections.singletonList(11), 0, 0);
        Trans trans = new Trans(5, 0, 12);

        ListES result = Answer.listESStepPrime(trans, current);

        assertEquals(new ListES(Collections.singletonList(10), Collections.singletonList(11), 12, 5), result);
    }
}
