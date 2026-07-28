package org.real.temp;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {

    public static String minifyHtml(String html) {
        List<String> blocks = new ArrayList<>();
        Matcher rawBlock = Pattern.compile("(?is)<(pre|textarea|script|style)\\b[^>]*>.*?</\\1>").matcher(html);
        StringBuffer protectedHtml = new StringBuffer();

        while (rawBlock.find()) {
            String key = token(blocks.size());
            blocks.add(rawBlock.group());
            rawBlock.appendReplacement(protectedHtml, Matcher.quoteReplacement(key));
        }
        rawBlock.appendTail(protectedHtml);

        html = normalizeTags(protectedHtml.toString().trim()
                .replaceAll("[ \\t]*\\r?\\n+[ \\t]*", "\u0001")
                .replaceAll("[ \\t]+", " "))
                .replaceAll(">\\s+<", "><")
                .replaceAll("(<[^/!][^>]*>) (?=[^<])", "$1")
                .replaceAll("([^>\\s]) (</[^>]+>)", "$1$2")
                .replace("\u0001", " ");

        for (int i = 0; i < blocks.size(); i++) {
            html = html.replace(token(i), blocks.get(i));
        }

        return html;
    }

    private static String token(int index) {
        return "\uE000HTML_BLOCK_" + index + "\uE000";
    }

    private static String normalizeTags(String html) {
        Matcher tag = Pattern.compile("<[^>]+>").matcher(html);
        StringBuffer result = new StringBuffer();

        while (tag.find()) {
            tag.appendReplacement(result, Matcher.quoteReplacement(
                    tag.group().replaceAll("\\s+", " ").replaceAll("\\s+>", ">")));
        }
        tag.appendTail(result);
        return result.toString();
    }
}
