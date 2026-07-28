package org.real.temp;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Answer {

    /**
     * Split HTML string into tag blocks and non-tag text blocks by specified tags
     *
     * @param html String containing HTML content
     * @param targetTags List of tags to match, e.g. ["div", "span"], defaults to handling p, ul, ol
     * @param preserveWhitespace Whether to preserve whitespace characters, False to automatically strip leading/trailing whitespace
     * @return List of split content arranged in original order
     */
    public static List<String> splitHtmlContent(String html, List<String> targetTags, boolean preserveWhitespace) {
        // Set default tag list
        if (targetTags == null) {
            targetTags = Arrays.asList("p", "ul", "ol");
        }

        // Validate tag format
        List<String> validTags = targetTags.stream()
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .collect(Collectors.toList());

        if (validTags.isEmpty()) {
            throw new IllegalArgumentException("At least one valid tag must be specified");
        }

        // Build regex pattern to support tag attributes and case insensitive matching
        // Using non-greedy matching (*?) to handle nested tags properly
        StringBuilder patternBuilder = new StringBuilder();
        for (int i = 0; i < validTags.size(); i++) {
            if (i > 0) {
                patternBuilder.append("|");
            }
            String tag = validTags.get(i);
            patternBuilder.append("<").append(Pattern.quote(tag)).append("\\b[^>]*?>.*?</").append(Pattern.quote(tag)).append(">");
        }

        Pattern pattern = Pattern.compile(patternBuilder.toString(), Pattern.DOTALL | Pattern.CASE_INSENSITIVE);

        // Find all matching tag blocks
        Matcher matcher = pattern.matcher(html);
        List<MatchResult> matches = new ArrayList<>();
        while (matcher.find()) {
            matches.add(matcher.toMatchResult());
        }

        // Split string into non-tag parts and tag parts
        List<String> result = new ArrayList<>();
        int lastEnd = 0;

        for (MatchResult match : matches) {
            // Add non-tag content before this match
            String nonTagContent = html.substring(lastEnd, match.start());
            if (!nonTagContent.isEmpty()) {
                if (!preserveWhitespace) {
                    nonTagContent = nonTagContent.trim();
                }
                if (!nonTagContent.isEmpty()) { // Only add non-empty content
                    result.add(nonTagContent);
                }
            }

            // Add the matched tag content
            String tagContent = match.group();
            result.add(tagContent);

            lastEnd = match.end();
        }

        // Handle remaining non-tag content
        String remainingContent = html.substring(lastEnd);
        if (!remainingContent.isEmpty()) {
            if (!preserveWhitespace) {
                remainingContent = remainingContent.trim();
            }
            if (!remainingContent.isEmpty()) {
                result.add(remainingContent);
            }
        }

        return result;
    }
}