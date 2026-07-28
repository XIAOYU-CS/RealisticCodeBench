package org.real.temp;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {

    /**
     * Parse the email string and extract the account and corresponding platform (domain) information
     *
     * @param emailStr String containing the email address
     * @return If a valid email is matched, returns a dictionary {"account": account, "platform": platform domain}
     *         If no valid email is matched, returns null
     */
    public static Map<String, String> parseEmail(String emailStr) {
        // Check if input is a string (not null)
        if (emailStr == null) {
            return null;
        }

        // Email pattern
        String emailPattern = "([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)";
        Pattern pattern = Pattern.compile(emailPattern);
        Matcher matcher = pattern.matcher(emailStr);

        if (matcher.find()) {
            String account = matcher.group(1);
            String platform = "@" + matcher.group(2);  // Keep the @ symbol
            String fullEmail = matcher.group(0);       // Full email

            Map<String, String> result = new HashMap<>();
            result.put("account", account);
            result.put("platform", platform);
            result.put("full_email", fullEmail);

            return result;
        } else {
            return null;
        }
    }
}
