/**
* Generates a website XML sitemap with support for custom URL transformation and flexible path handling.
*
* @param rootDir Local path to the website's root directory
* @param baseUrl Base URL of the website (e.g., https://example.com/)
* @param urlTransformFunc Custom URL transformation function that takes (original URL, relative path, filename) as inputs and returns a transformed URL
* @return List of URLs in the sitemap
*/
public static List<String> generateSitemap(String rootDir, String baseUrl, UrlTransformFunction urlTransformFunc) {}