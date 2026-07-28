package org.real.temp;

public class Answer {
    public static boolean isPascalCase(String input) {
        return input != null && input.matches("[A-Z][a-z]*(?:[A-Z][a-z]*)*");
    }
}
