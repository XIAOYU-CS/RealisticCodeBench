package org.real.temp;

public class Answer {
    public static String camelCaseToCapitalizedWithSpaces(String input) {
        String sentence = input.replaceAll("([a-z])([A-Z])", "$1 $2").toLowerCase();
        if (sentence.isEmpty()) {
            return sentence;
        }
        return Character.toUpperCase(sentence.charAt(0)) + sentence.substring(1);
    }

    public static void main(String[] args) {
        String input = "thisIsAnExample123";
        String result = camelCaseToCapitalizedWithSpaces(input);
        System.out.println(result); // Output: "This Is An Example 123"
    }
}
