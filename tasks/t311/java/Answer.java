package org.real.temp;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class Answer {

    @FunctionalInterface
    public interface UrlTransformFunction {
        String transform(String url, String relPath, String filename);
    }

    /**
     * Generates a website XML sitemap with support for custom URL transformation and flexible path handling.
     *
     * @param rootDir Local path to the website's root directory
     * @param baseUrl Base URL of the website (e.g., https://example.com/)
     * @param urlTransformFunc Custom URL transformation function that takes (original URL, relative path, filename) as inputs and returns a transformed URL
     * @return List of URLs in the sitemap
     */
    public static List<String> generateSitemap(String rootDir, String baseUrl, UrlTransformFunction urlTransformFunc) {
        String normalizedBase = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

        List<String> urls = new ArrayList<>();
        urls.add(normalizedBase);

        try {
            Files.walk(Paths.get(rootDir))
                .filter(Files::isRegularFile)
                .filter(path -> path.toString().endsWith(".htm"))
                .filter(path -> !path.getFileName().toString().contains("template"))
                .forEach(path -> {
                    try {
                        String relPath = Paths.get(rootDir).relativize(path).toString();
                        String urlPath = relPath.replace(File.separator, "/");
                        String encodedPath = URLEncoder.encode(urlPath, StandardCharsets.UTF_8.toString())
                                .replace("%2F", "/");

                        String rawUrl = normalizedBase + encodedPath;

                        String finalUrl;
                        if (urlTransformFunc != null) {
                            finalUrl = urlTransformFunc.transform(rawUrl, relPath, path.getFileName().toString());
                        } else {
                            finalUrl = rawUrl;
                        }

                        urls.add(finalUrl);
                    } catch (Exception e) {
                        // Handle encoding exception
                    }
                });
        } catch (IOException e) {
            // Handle walk exception
        }

        // Remove duplicates and sort
        List<String> uniqueSortedUrls = urls.stream()
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Added " + uniqueSortedUrls.size() + " page to the site map");
        return uniqueSortedUrls;
    }

    // Overloaded method without URL transform function
    public static List<String> generateSitemap(String rootDir, String baseUrl) {
        return generateSitemap(rootDir, baseUrl, null);
    }
}
