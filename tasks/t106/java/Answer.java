package org.real.temp;

public class Answer {
    public static boolean canClassToDict(Object obj) {
        return obj != null && !isBoxedPrimitive(obj) && !(obj instanceof String);
    }

    private static boolean isBoxedPrimitive(Object obj) {
        return obj instanceof Number
                || obj instanceof Boolean
                || obj instanceof Character;
    }
}
