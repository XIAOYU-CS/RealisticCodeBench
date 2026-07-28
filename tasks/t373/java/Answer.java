package org.real.temp;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Answer {

    /**
     * Tokenize SQL WHERE clause into individual tokens
     *
     * @param whereClause SQL WHERE clause string
     * @return List of tokens
     */
    public static List<String> tokenizeWhereClause(String whereClause) {
        String pattern = "(\\bAND\\b)|(\\bOR\\b)|(\\bNOT\\b)|(=|<>|!=|<=|>=|<|>)|(\\bIN\\b)|(\\bLIKE\\b)|(\\bBETWEEN\\b)|(\\bIS\\b)|(\\()|(\\))|(,)|('[^']*')|(\\bNULL\\b)|([a-zA-Z_][a-zA-Z0-9_.]*)|(\\d+\\.?\\d*)";

        Pattern regex = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE);
        Matcher matcher = regex.matcher(whereClause);

        List<String> result = new ArrayList<>();

        while (matcher.find()) {
            String matchedToken = null;
            for (int i = 1; i <= matcher.groupCount(); i++) {
                String group = matcher.group(i);
                if (group != null && !group.isEmpty()) {
                    matchedToken = group;
                    break;
                }
            }

            if (matchedToken != null) {
                // Keywords to uppercase, others keep as is
                String upperToken = matchedToken.toUpperCase();
                if (Arrays.asList("AND", "OR", "NOT", "IN", "LIKE", "BETWEEN", "IS", "NULL").contains(upperToken)) {
                    result.add(upperToken);
                } else {
                    result.add(matchedToken);
                }
            }
        }

        return result;
    }

    /**
     * Convert SQL WHERE clause infix expression to prefix expression
     *
     * @param whereClause SQL WHERE clause string
     * @return Prefix expression string
     */
    public static String sqlWhereToPrefix(String whereClause) {
        // Define operator precedence, higher number means higher precedence
        Map<String, Integer> precedence = new HashMap<>();
        precedence.put("NOT", 5);     // Unary NOT operator
        precedence.put("IS", 4);      // IS operator
        precedence.put("IN", 3);      // IN operator
        precedence.put("LIKE", 3);    // LIKE operator
        precedence.put("BETWEEN", 3); // BETWEEN operator
        precedence.put("=", 2);       // Equality comparison
        precedence.put("<>", 2);      // Inequality comparison
        precedence.put("!=", 2);      // Inequality comparison
        precedence.put("<", 2);       // Less than comparison
        precedence.put(">", 2);       // Greater than comparison
        precedence.put("<=", 2);      // Less than or equal comparison
        precedence.put(">=", 2);      // Greater than or equal comparison
        precedence.put("AND", 1);     // Logical AND
        precedence.put("OR", 0);      // Logical OR

        // Tokenize the WHERE clause
        List<String> tokens = tokenizeWhereClause(whereClause);
        if (tokens.isEmpty()) {
            return "";
        }

        // Reverse tokens and swap parentheses to prepare for prefix conversion
        List<String> reversedTokens = new ArrayList<>();
        for (int i = tokens.size() - 1; i >= 0; i--) {
            String token = tokens.get(i);
            if (token.equals("(")) {
                reversedTokens.add(")");  // Left parenthesis becomes right parenthesis
            } else if (token.equals(")")) {
                reversedTokens.add("(");  // Right parenthesis becomes left parenthesis
            } else {
                reversedTokens.add(token);
            }
        }

        // Initialize output queue and operator stack
        List<String> output = new ArrayList<>();  // Store final prefix expression elements
        Stack<String> stack = new Stack<>();      // Operator stack for handling precedence

        // Scan reversed tokens from left to right
        int i = 0;
        while (i < reversedTokens.size()) {
            String token = reversedTokens.get(i);

            // Handle operands (identifiers, strings, numbers, etc.)
            // If token is not an operator, not a parenthesis, and not a comma, it's an operand
            if (!precedence.containsKey(token) && !token.equals("(") && !token.equals(")") && !token.equals(",")) {
                output.add(token);
                i += 1;
            }
            // Handle right parenthesis (left parenthesis in original expression)
            // Right parenthesis is pushed to stack and waits for matching left parenthesis
            else if (token.equals(")")) {
                stack.push(token);
                i += 1;
            }
            // Handle left parenthesis (right parenthesis in original expression)
            // Pop elements from stack until matching right parenthesis is found
            else if (token.equals("(")) {
                while (!stack.isEmpty() && !stack.peek().equals(")")) {
                    output.add(stack.pop());
                }
                if (!stack.isEmpty()) {
                    stack.pop();  // Remove the matching right parenthesis
                }
                i += 1;
            }
            // Handle comma (mainly used for IN lists and other scenarios)
            // Comma is usually ignored in prefix expressions
            else if (token.equals(",")) {
                i += 1;
            }
            // Handle operators
            else {
                // Pop operators from stack based on precedence
                // Current operator has lower or equal precedence than stack top
                while (!stack.isEmpty() &&
                       !stack.peek().equals(")") &&
                       precedence.containsKey(stack.peek()) &&
                       precedence.get(stack.peek()) > precedence.getOrDefault(token, -1)) {
                    output.add(stack.pop());
                }
                stack.push(token);
                i += 1;
            }
        }

        // Pop remaining operators from stack
        while (!stack.isEmpty()) {
            if (!stack.peek().equals("(") && !stack.peek().equals(")")) {
                output.add(stack.pop());
            } else {
                stack.pop();  // Ignore parentheses
            }
        }

        // Reverse the output to get final prefix expression
        Collections.reverse(output);
        return String.join(" ", output);
    }
}
