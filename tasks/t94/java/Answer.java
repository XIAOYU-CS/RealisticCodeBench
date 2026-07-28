package org.real.temp;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {
    private static final Pattern TYPE_NAME = Pattern.compile("[A-Za-z_][A-Za-z0-9_]*(?:\\.[A-Za-z_][A-Za-z0-9_]*)*");

    public static List<String> parseTypeHint(String typeHintString) {
        List<String> result = new ArrayList<>();
        Matcher matcher = TYPE_NAME.matcher(typeHintString);
        while (matcher.find()) {
            String name = matcher.group();
            if (!name.equals("None") && !name.equals("True") && !name.equals("False")) {
                result.add(name);
            }
        }
        return result;
    }
}
