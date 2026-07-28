package org.real.temp;

public class Answer {
    public static boolean isKebabCase(String input) {
        return input.matches("^[a-z]+(-[a-z]+)*$");
    }
}
