import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {
    private static final Pattern RULE = Pattern.compile("([^{}]+)\\{([^{}]*)\\}");

    public static String extractCssFromStylesheet(Object sheet) {
        if (!(sheet instanceof String)) {
            return "";
        }

        Matcher matcher = RULE.matcher(((String) sheet).trim());
        StringBuilder css = new StringBuilder();
        while (matcher.find()) {
            String selector = matcher.group(1).trim();
            String body = normalizeDeclarations(matcher.group(2));
            if (!selector.isEmpty() && !body.isEmpty()) {
                css.append(selector).append(" {").append(body).append("}");
            }
        }
        return css.toString();
    }

    private static String normalizeDeclarations(String body) {
        StringBuilder declarations = new StringBuilder();
        for (String declaration : body.split(";")) {
            declaration = declaration.trim();
            if (!declaration.isEmpty()) {
                declarations.append(declaration.replaceAll("\\s*:\\s*", ": ")).append(";");
            }
        }
        return declarations.toString();
    }
}
